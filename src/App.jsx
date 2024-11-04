import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoList from './components/TodoList'

function App() {


  return (
    <>
     <section class="todoapp">
      <Header/>

      <TodoList/>

	    <Footer/>

    </section>
    </>
  )
}

export default App
