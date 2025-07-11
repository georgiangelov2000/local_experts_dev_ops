import User from "./Profiles/User";
import Provider from "./Profiles/Provider";


export default function Profile({ user }) {
  if (user.type === 'user') {
    return <User user={user} />;
  }
  else if (user.type === 'provider') {
    return <Provider user={user} />;
  }
  else {
    return <div>Unknown user type</div>;
  }
}