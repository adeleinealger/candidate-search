import type { Candidate } from '../interfaces/Candidate.interface';
import { IoRemoveCircle } from 'react-icons/io5';

// To be rendered in the SavedCandidateList
type SavedCandidateProps = {
  candidate: Candidate;
  rejectCandidate: (id: number) => void;
};
const SavedCandidate = ({ candidate, rejectCandidate }: SavedCandidateProps) => (
  <tr>
    {candidate ? (
      <>
        <td>
          <img
            src={candidate.avatar_url || undefined}
            alt={`Profile of ${candidate.login}`}
            style={{
              width: 70,
              borderRadius: 10,
              display: 'block',
              margin: '0 auto',
            }}
          />
        </td>
        <td>
          <a href={candidate.html_url || ''} target="_blank" rel="noreferrer">
            <h3 style={{ color: 'white' }}>
              {candidate.name}
              <br />
              <em>({candidate.login})</em>
            </h3>
          </a>
        </td>
        <td>{candidate.location}</td>
        <td>
          <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
        </td>
        <td>{candidate.company}</td>
        <td>
          <div style={{ maxHeight: 100, overflowY: 'scroll' }}>{candidate.bio}</div>
        </td>
        <td>
          <IoRemoveCircle
            style={{
              color: 'red',
              margin: '0 auto',
              display: 'block',
              cursor: 'pointer',
              fontSize: 50,
            }}
            onClick={() => candidate.id !== null && rejectCandidate(candidate.id)}
            aria-label="Remove candidate"
            title="Remove candidate"
          />
        </td>
      </>
    ) : (
      <td colSpan={7} style={{ textAlign: 'center' }}>
        <h2>No Candidates at this time</h2>
      </td>
    )}
  </tr>
);

export default SavedCandidate;
