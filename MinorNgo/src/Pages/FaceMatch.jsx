import { useState } from 'react';
import axios from 'axios';

const FaceMatch = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [matchResult, setMatchResult] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await axios.post("http://127.0.0.1:5000/match-face", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMatchResult(response.data.match ? "Match found!" : "No match found.");
        } catch (error) {
            setMatchResult("Error: " + (error.response ? error.response.data.error : "Server error"));
        }
    };

    return (
        <div>
            <h2>Face Match</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Check Match</button>
            </form>
            <p>{matchResult}</p>
        </div>
    );
};

export default FaceMatch;
