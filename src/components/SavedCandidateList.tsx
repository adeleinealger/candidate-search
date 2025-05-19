import { useEffect, useState } from 'react';
import SavedCandidate from './SavedCandidate';
import type { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidateList = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    const candidates: Candidate[] = savedCandidates ? JSON.parse(savedCandidates) : [];
    setPotentialCandidates(candidates);
  }, []);

  const rejectCandidate = (id: number) => {
    const savedCandidates = localStorage.getItem('savedCandidates');
    let parsedCandidates: Candidate[] = savedCandidates ? JSON.parse(savedCandidates) : [];
    parsedCandidates = parsedCandidates.filter((person) => person.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(parsedCandidates));
    setPotentialCandidates(parsedCandidates);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>Company</th>
          <th>Bio</th>
          <th>Reject</th>
        </tr>
      </thead>
      <tbody>
        {potentialCandidates.length > 0 ? (
          potentialCandidates.map((candidate) => (
            <SavedCandidate
              key={candidate.id}
              candidate={candidate}
              rejectCandidate={rejectCandidate}
            />
          ))
        ) : (
          <tr>
            <td colSpan={7} style={{ textAlign: 'center' }}>
              <h2>No Candidates at this time</h2>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SavedCandidateList;
