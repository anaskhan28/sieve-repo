import json
import jsonschema
import requests
import sys

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
                "summary": {"type": "string", "minLength": 10},
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
    links = [playlist["playlist_link"] for playlist in playlists]
    if len(links) == len(set(links)):
        raise ValueError("Duplicate playlist links found", links)

def check_summary_length(playlists):
    for playlist in playlists:
        if len(playlist["summary"].split()) < 20:  # Assuming 10 words as minimum for 3 lines
            raise ValueError(f"Summary too short for playlist {playlist['id']}")

def check_youtube_links(playlists):
    for playlist in playlists:
        if "youtube.com" not in playlist["playlist_link"] and "youtu.be" not in playlist["playlist_link"]:
            raise ValueError(f"Invalid YouTube link for playlist {playlist['id']}")

def main():
    try:
        playlists = load_playlists('playlist.json')
        validate_schema(playlists)
        check_unique_links(playlists)
        check_summary_length(playlists)
        check_youtube_links(playlists)
        print("Playlist verification passed!")
    except Exception as e:
        print(f"Verification failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()