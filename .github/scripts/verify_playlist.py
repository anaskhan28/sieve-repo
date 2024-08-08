import json
import jsonschema
import requests
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
                "id": {"type": "integer"},
                "name": {"type": "string"},
                "playlist_link": {"type": "string", "format": "uri"},
                "summary": {"type": "string"},
                "title": {"type": "string"},
                "category": {"type": "string"},
                "user_profile_link": {"type": "string", "format": "uri"},
                "user_Image": {"type": "string", "format": "uri"}
            },
            "required": ["id", "name", "playlist_link", "summary", "title", "category", "user_profile_link", "user_Image"]
        }
    }
    jsonschema.validate(instance=playlists, schema=schema)

def check_unique_links(playlists):
    links = {}
    for playlist in playlists:
        link = playlist["playlist_link"]
        if link in links:
            raise ValueError(f"Duplicate playlist link found: '{link}' (IDs: {links[link]}, {playlist['id']})")
        links[link] = playlist['id']

def check_summary_length(playlists):
    for playlist in playlists:
        if len(playlist["summary"].split()) < 20:
            raise ValueError(f"Summary too short for playlist ID {playlist['id']}. It should be at least 20 words long.")

def check_youtube_links(playlists):
    for playlist in playlists:
        if "youtube.com" not in playlist["playlist_link"] and "youtu.be" not in playlist["playlist_link"]:
            raise ValueError(f"Invalid YouTube link for playlist ID {playlist['id']}: '{playlist['playlist_link']}'")

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
    
    message = ""
    if errors:
        message = "❌ Playlist verification failed. Please address the following issues:\n\n"
        message += "\n".join(f"- {error}" for error in errors)
        message += "\n\nPlease review and update your submission."
    else:
        message = "✅ Playlist verification passed! Your submission looks good."
    
    # Sanitize and write result to result.txt
    sanitized_message = message.replace('\n', '\\n').replace('\r', '')
    with open('result.txt', 'w') as fh:
        fh.write(sanitized_message)

if __name__ == "__main__":
    main()
