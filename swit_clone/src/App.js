import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import SwitHome from './SwitHome/SwitHome';
import BuildWorkspace1 from './BuildWorkspace/BuildWorkspace1';
import BuildWorkspace2 from './BuildWorkspace/BuildWorkspace2';
import MainScreen from './ChatScreen/MainScreen';
import IdeaScreen from './IdeaScreen/IdeaScreen';
import TempLogin from './TempLogin/TempLogin';

import EmailJoinComplete from './Join/EmailJoinComplete';
import LinkJoinComplete from './Join/LinkJoinComplete';
import LinkJoin from './Join/LinkJoin';

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={TempLogin}/>
            <Route path="/email/joined/:userId/:workspaceId" component={EmailJoinComplete}/>
            <Route path="/link/joined/:userId/:workspaceId" component={LinkJoinComplete}/>
            <Route path="/link/join/:workspaceId" component={LinkJoin}/>
            <Route path="/swit-home/:userId" component={SwitHome}/>
            <Route path="/build-workspace1/:userId" component={BuildWorkspace1}/>
            <Route path="/build-workspace2/:userId/:workspaceUrl" component={BuildWorkspace2}/>
            <Route exact path="/:userId/:workspaceUrl/:currentChannelIndex/chat/:currentChattingIndex" component={MainScreen}/>
            <Route exact path="/:userId/:workspaceUrl/:currentChannelIndex/idea/:currentChattingIndex" component={IdeaScreen}/>
        </BrowserRouter>
    );
}

export default App;