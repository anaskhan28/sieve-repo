## Contributing 🤝

We welcome contributions from the community! To contribute:

1. **Fork the repository**:
    - Click the "Fork" button on the top right corner of this repository.

2. **Clone your fork**:
    ```bash
    git clone https://github.com/anaskhan28/sieve-repo.git
    cd sieve
    ```

3. **Create a new branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes** and **commit**:
    ```bash
    git commit -m "Add your commit message"
    ```

5. **Push to the branch**:
    ```bash
    git push origin feature/your-feature-name
    ```

6. **Open a Pull Request**:
    - Navigate to the original repository and click the "New Pull Request" button.

### Adding Playlists

To add a new playlist, please follow these steps:

1. Open the `playlist.json` file.
2. Add your playlist details in the following format:

    ```json
      {
      "name": "Anas Khan",
      "playlist_link": "https://www.youtube.com/playlist?list=PLIY8eNdw5tW_7-QrsY_n9nC0Xfhs1tLEK",
      "summary": "All the concepts, algorithms and protocols related to Network Security which you as an IT student will need the most.",
      "title": "Network Security",
      "category": "Cyber Security",
      "user_profile_link": "https://github.com/anaskhan28",
      "user_Image": "https://avatars.githubusercontent.com/u/87796038?s=96&v=4"
    }
  
    ```
3. Choose `playlist` one category from below:

      ```
      [
        "Animation",
        "Backend Development",
        "Cyber Security",
        "Data Structures",
        "Devops",
        "Frontend Development",
        "Full-Stack Development",
        "Machine Learning",
        "Projects",
        "UI UX Design",
        "System Design",
      ]
      
      ```

4. Save the file and commit your changes.