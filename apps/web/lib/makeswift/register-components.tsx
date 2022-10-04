import SignupForm from '../components/SignupForm';
import { Style } from '@makeswift/runtime/controls';
import { ReactRuntime } from '@makeswift/runtime/react';

// Register your components here!

function HelloWorld(props: { className?: string }) {
  return <p {...props}>Hello, world!</p>;
}

ReactRuntime.registerComponent(HelloWorld, {
  type: 'hello-world',
  label: 'Hello, world!',
  props: {
    className: Style({ properties: Style.All }),
  },
});

ReactRuntime.registerComponent(SignupForm, {
  type: 'signup-form',
  label: 'Signup Form',
  props: {
    className: Style({ properties: Style.All }),
  },
});
