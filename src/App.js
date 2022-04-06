import { ListOfPost } from "./components/blogs/ListOfBlogs";
import { Layout } from "./components/Layout";
import { ContextProvider } from "./context/postsContext";
import { ContextAuthProvider } from "./context/authContext";
import { AppRouter } from "./routers/AppRouter";

function App() {
  return (
    <ContextAuthProvider>
      <ContextProvider>
        <AppRouter />
      </ContextProvider>
    </ContextAuthProvider>
  );
}

export default App;
