import { signInWithGoogle } from 'app/ha/actions';
import Button from '../Button';

export default function LoginButton() {
  return (
    <form>
      <Button formAction={signInWithGoogle}>Login</Button>
    </form>
  );
}
