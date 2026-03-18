import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import AuthProvider from '../auth/authProvider/AuthProvider';
import MainLayout from './MainLayout';
import HomePage from '../pages/HomePage';
import QuestionPage from '../pages/QuestionPage';
import NotFoundPage from '../pages/NotFoundPage';
import AddQuestionPage from '../pages/AddQuestionPage';
import EditQuestionPage from '../pages/EditQuestionPage';
import SettingsPage from '../pages/SettingsPage';
import ForbiddenPage from '../pages/ForbiddenPage/ForbiddenPage';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = () => {
	const { isAuth } = useAuth();
	const location = useLocation();

	return isAuth ? <Outlet /> : <Navigate to='/forbidden' state={{ from: location }} replace />;
};

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path='/' element={<HomePage />} />

						<Route element={<ProtectedRoute />}>
							<Route path='/addquestion' element={<AddQuestionPage />} />
							<Route path='/editquestion/:id' element={<EditQuestionPage />} />
							<Route path='/settings' element={<SettingsPage />} />
						</Route>

						<Route path='/question/:id' element={<QuestionPage />} />
						<Route path='/forbidden' element={<ForbiddenPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
