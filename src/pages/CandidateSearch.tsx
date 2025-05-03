import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        // Fetch a list of random users
        const users = await searchGithub();
        console.log(users)
        if (users.length > 0) {
          // Fetch detailed information for the first user
          const userDetails = await searchGithubUser(users[0].login);
          setCandidate(userDetails);
        } else {
          setError('No candidates found.');
        }
      } catch (err) {
        setError('Failed to fetch candidate information.');
      }
    };

    fetchCandidate();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!candidate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Candidate Information</h1>
      <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} width="150" />
      <p><strong>Name:</strong> {candidate.name || 'N/A'}</p>
      <p><strong>Username:</strong> {candidate.login}</p>
      <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
      <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
      <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
      <p>
        <strong>GitHub Profile:</strong>{' '}
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
          {candidate.html_url}
        </a>
      </p>
    </div>
  );
};

export default CandidateSearch;
