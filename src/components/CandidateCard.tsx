import type { Candidate } from '../interfaces/Candidate.interface';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

type CandidateCardProps = {
  currentUser: Candidate;
  makeDecision: (isSelected: boolean) => void;
};

const cardImageStyle = {
  width: '300px',
  borderRadius: '30px 30px 0 0',
};

const cardInfoStyle = {
  backgroundColor: '#000',
  width: '280px',
  borderRadius: '0 0 30px 30px',
  padding: '0 10px 10px',
};

const actionSectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '10px',
};

const iconStyle = (color: string) => ({
  color,
  fontSize: '80px',
  cursor: 'pointer',
});

const CandidateDetails = ({ user }: { user: Candidate }) => (
  <>
    {user.html_url && user.login && (
      <a href={user.html_url} target="_blank" rel="noreferrer">
        <h2 style={{ padding: 0, margin: '-7px 0 0 0', color: 'white' }}>
          {user.name}
          <em>({user.login})</em>
        </h2>
      </a>
    )}
    {user.location && <p>Location: {user.location}</p>}
    {user.email && (
      <p>
        Email: <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
    )}
    {user.company && <p>Company: {user.company}</p>}
    {user.bio && <p>Bio: {user.bio}</p>}
  </>
);

const CandidateCard = ({ currentUser, makeDecision }: CandidateCardProps) => {
  if (!currentUser?.login) {
    return (
      <section>
        <h2>No Candidates at this time</h2>
      </section>
    );
  }

  return (
    <section>
      <img
        src={currentUser.avatar_url ?? 'https://placehold.co/600x400'}
        alt={`Profile of ${currentUser.login ?? 'Placeholder'}`}
        style={cardImageStyle}
      />
      <section style={cardInfoStyle}>
        <CandidateDetails user={currentUser} />
      </section>
      <section style={actionSectionStyle}>
        <IoRemoveCircle
          style={iconStyle('red')}
          onClick={() => makeDecision(false)}
        />
        <IoAddCircle
          style={iconStyle('green')}
          onClick={() => makeDecision(true)}
        />
      </section>
    </section>
  );
};

export default CandidateCard;
