import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import AppLayout from "./components/AppLayout";

function Router() {
  return (
    <Switch>
      {/* Home — portfólio AI Engineer para recrutadores */}
      <Route path="/" component={Home} />

      {/* Login simples */}
      <Route path="/login" component={Login} />

      {/* Arquimedes — agente de matemática */}
      <Route path="/arquimedes" component={() => <AppLayout agent="arquimedes"><Chat /></AppLayout>} />
      <Route path="/arquimedes/chat" component={() => <AppLayout agent="arquimedes"><Chat /></AppLayout>} />
      <Route path="/arquimedes/chat/:sessionId" component={({ params }) => <AppLayout agent="arquimedes"><Chat sessionId={params.sessionId} /></AppLayout>} />
      <Route path="/arquimedes/topicos" component={() => <AppLayout agent="arquimedes"><Topics /></AppLayout>} />
      <Route path="/arquimedes/topicos/:slug" component={({ params }) => <AppLayout agent="arquimedes"><TopicDetail slug={params.slug} /></AppLayout>} />
      <Route path="/arquimedes/exercicios" component={() => <AppLayout agent="arquimedes"><Exercises /></AppLayout>} />
      <Route path="/arquimedes/exercicios/:topicSlug" component={({ params }) => <AppLayout agent="arquimedes"><Exercises topicSlug={params.topicSlug} /></AppLayout>} />
      <Route path="/arquimedes/progresso" component={() => <AppLayout agent="arquimedes"><Progress /></AppLayout>} />

      {/* Legacy redirects */}
      <Route path="/chat" component={() => <AppLayout agent="arquimedes"><Chat /></AppLayout>} />
      <Route path="/topicos" component={() => <AppLayout agent="arquimedes"><Topics /></AppLayout>} />
      <Route path="/exercicios" component={() => <AppLayout agent="arquimedes"><Exercises /></AppLayout>} />
      <Route path="/progresso" component={() => <AppLayout agent="arquimedes"><Progress /></AppLayout>} />

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
