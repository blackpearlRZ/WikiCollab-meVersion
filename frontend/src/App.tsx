//import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Sonner } from "./components/ui/sonner.tsx";
//import NotFound from "./pages/NotFound.tsx";
import Login  from "./pages/login/index.tsx";
import Signup from "./pages/signup/index.tsx"
import AppShell from "./components/layout/AppShell.tsx";
import Dashboard from "./pages/dashboard";
import Spaces from "./pages/spaces/Spaces.tsx";
import SpaceDetails from "./pages/space-detail";
//import PageEditor from "./pages/PageEditor.tsx";
//import Notifications from "./pages/notifications";
import Settings from "./pages/settings";
//import Profile from "./pages/profils";
import { AuthProvider } from "./components/auth/AuthContext.tsx";
import PageEditor from "./pages/page-editor/index.tsx";

//const queryClient = new QueryClient();

const App = () => (
    <AuthProvider>
      {/* <Sonner /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="/app/spaces" element={<Spaces />} />
            <Route path="/app/spaces/:spaceId" element={<SpaceDetails />} />
            <Route path="/app/spaces/:spaceId/pages/:pageId" element={<PageEditor />} />  
            {/* <Route path="/app/notifications" element={<Notifications />} /> */}
            <Route path="/app/settings" element={<Settings />} />
            {/* <Route path="/app/profile" element={<Profile />} /> */}
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
);

export default App;
