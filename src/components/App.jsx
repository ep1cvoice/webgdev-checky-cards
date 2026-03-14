import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from '../pages/HomePage';
import QuestionPage from '../pages/QuestionPage';
import NotFoundPage from '../pages/NotFoundPage';
import AddQuestionPage from '../pages/AddQuestionPage/AddQuestionPage';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path='/' element={<HomePage />}></Route>

						<Route path='/addquestion' element={<AddQuestionPage />}></Route>

						<Route path='/forbidden' element={<div> Forbidden</div>}></Route>

						<Route path='/question/:id' element={<QuestionPage />}></Route>

						<Route path='*' element={<NotFoundPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
