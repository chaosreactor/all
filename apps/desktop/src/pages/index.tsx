import { useState, createRef } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import { Nav, Playfield, CommandBar } from '../../../../libs/ui/src/index';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  const wrapper = createRef<HTMLDivElement>();

  return (
    <div id="wrapper" ref={wrapper}>
      <CommandBar />
      <Nav />
      <Playfield height="100%" width="100%" />
    </div>
  );
}

export default App;
