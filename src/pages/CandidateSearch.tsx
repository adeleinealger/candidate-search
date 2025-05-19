import { useState, useEffect } from 'react';

import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import type { Candidate } from '../interfaces/Candidate.interface';

const initialCandidate: Candidate = {
  id: null,
  login: null,
  email: null,
  html_url: null,
  name: null,
  bio: null,
  company: null,
  location: null,
  avatar_url: null,
};

const CandidateSearch = () => {
  const [results, setResults] = useState<Candidate[]>([]);
  const [currentUser, setCurrentUser] = useState<Candidate>(initialCandidate);
  const [currentIdx, setCurrentIdx] = useState(0);

  const searchForSpecificUser = async (user: string) => {
    const data = await searchGithubUser(user);
    setCurrentUser(data);
  };

  const searchForUsers = async () => {
    const data = await searchGithub();
    setResults(data);
    if (data.length > 0) {
      await searchForSpecificUser(data[0].login || '');
    }
  };

  const makeDecision = async (isSelected: boolean) => {
    if (isSelected) {
      const savedCandidates = localStorage.getItem('savedCandidates');
      const parsedCandidates: Candidate[] = savedCandidates ? JSON.parse(savedCandidates) : [];
      parsedCandidates.push(currentUser);
      localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
    }
    if (currentIdx + 1 < results.length) {
      setCurrentIdx(currentIdx + 1);
      await searchForSpecificUser(results[currentIdx + 1].login || '');
    } else {
      setCurrentIdx(0);
      await searchForUsers();
    }
  };

  useEffect(() => {
    searchForUsers();
    // Only search for a specific user if login is present
    if (currentUser.login) {
      searchForSpecificUser(currentUser.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>
      <CandidateCard currentUser={currentUser} makeDecision={makeDecision} />
    </>
  );
};

export default CandidateSearch;
