import json
import jsonschema
import os

def load_playlists(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def validate_schema(playlists):
    schema = {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "playlist_link": {"type": "string", "format": "uri"},
                "summary": {"type": "string"},
                "title": {"type": "string"},
                "category": {"type": "string"},
                "user_profile_link": {"type": "string", "format": "uri"},
                "user_Image": {"type": "string", "format": "uri"}
            },
            "required": [ "name", "playlist_link", "summary", "title", "category", "user_profile_link", "user_Image"]
        }
    }
    jsonschema.validate(instance=playlists, schema=schema)

def check_unique_links(playlists):
    links = {}
    for playlist in playlists:
        link = playlist["playlist_link"]
        if link in links:
            raise ValueError(f"Duplicate playlist link found: '{link}' (Names: {links[link]}, {playlist['name']})")
        links[link] = playlist['title']

def check_summary_length(playlists):
    for playlist in playlists:
        if len(playlist["summary"].split()) < 10:
            raise ValueError(f"Summary too short for playlist {playlist['title']}. It should be at least 20 words long.")

def check_youtube_links(playlists):
    for playlist in playlists:
        if "youtube.com" not in playlist["playlist_link"] and "youtu.be" not in playlist["playlist_link"]:
            raise ValueError(f"Invalid YouTube link for playlist name  {playlist['title']}: '{playlist['playlist_link']}'")

def main():
    errors = []
    try:
        playlists = load_playlists('playlist.json')
        validate_schema(playlists)
    except json.JSONDecodeError as e:
        errors.append(f"Invalid JSON format: {str(e)}")
    except jsonschema.exceptions.ValidationError as e:
        errors.append(f"Schema validation error: {e.message}")
    
    if not errors:
        try:
            check_unique_links(playlists)
        except ValueError as e:
            errors.append(str(e))
        
        try:
            check_summary_length(playlists)
        except ValueError as e:
            errors.append(str(e))
        
        try:
            check_youtube_links(playlists)
        except ValueError as e:
            errors.append(str(e))
    
    # Create the message
    if errors:
        message = "Playlist verification failed. Please address the following issues:\n\n"
        message += "\n".join(f"- {error}" for error in errors)
        message += "\n\nPlease review and update your submission."
    else:
        message = "Playlist verification passed! Your submission looks good."
    
    # Write result to result.txt using UTF-8 encoding
    try:
        with open('result.txt', 'w', encoding='utf-8') as fh:
            fh.write(message)
    except Exception as e:
        print(f"Error writing to file: {str(e)}")
        # Fallback to printing the message if file writing fails
        print(message)

    # For GitHub Actions
    print(f"::set-output name=result::{message}")
if __name__ == "__main__":
    main()
