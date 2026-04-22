import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import AppLayout from "./components/AppLayout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={() => <AppLayout><Chat /></AppLayout>} />
      <Route path="/chat/:sessionId" component={({ params }) => <AppLayout><Chat sessionId={params.sessionId} /></AppLayout>} />
      <Route path="/topicos" component={() => <AppLayout><Topics /></AppLayout>} />
      <Route path="/topicos/:slug" component={({ params }) => <AppLayout><TopicDetail slug={params.slug} /></AppLayout>} />
      <Route path="/exercicios" component={() => <AppLayout><Exercises /></AppLayout>} />
      <Route path="/exercicios/:topicSlug" component={({ params }) => <AppLayout><Exercises topicSlug={params.topicSlug} /></AppLayout>} />
      <Route path="/progresso" component={() => <AppLayout><Progress /></AppLayout>} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
