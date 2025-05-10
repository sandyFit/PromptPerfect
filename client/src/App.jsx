import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './app/DashboardLayout';
import TranslatePrompts from './app/TranslatePrompts';
import CliIntegration from './app/CliIntegration';
import Test from './pages/Test';
import PromptTesting from './app/PromptTesting';

const App = () => {
    return (
        <div>

            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/app" element={<Dashboard />} >
                    <Route path="/app/translate" element={<TranslatePrompts />} />
                    <Route path="/app/test" element={<PromptTesting />} />
                    <Route path="/app/cli" element={<CliIntegration />} />
                </Route>
                <Route path="/test" element={<Test />} />
            </Routes>
        </div>

    )
}

export default App;
