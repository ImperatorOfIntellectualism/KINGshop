<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>

React
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<Объект Реакт/>/JSX, DOM объект) - Рендер объекта реакт в DOM объетке

class MyComponentClass extends React.Component {
  render() {
    return <h1>Hello world</h1>;
  }
} - Создание компонента

myFunc() {
    alert('Stop it.  Stop hovering.');
  }
 
  render() {
    return (
      <div onHover={this.myFunc}>
      </div>
    );
  } - Добавление функции для элемента <a>{req.cookies["login"]}</a>

  Хуки:

  Обычный класс
  class MyComponentClass extends React.Component {
  render() {
    return <h1>Hello world</h1>;
  }
}
Идентичный класс, но являющийся хуком
class function MyComponentClass()  {
    return <h1>Hello world</h1>;
}

useState:
const [1 аргумент(переменная), 2 аргумент(метод, изменяющий переменную)] = useState(данные, которые нужно передать в 1 аргумент)

useCallback(функция(), []) - можно оборачивать функцию, что позволяет не пересоздавать её при повторном обращении к классу. В массив можно вставить переменную, и если она изменится, то функция пересоздастся.

Три точки:
<Modal {...this.props} title='Modal heading' animation={false}> = <Modal a={this.props.a} b={this.props.b} title='Modal heading' animation={false}>

useEffect:
useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError]) - При изменении любого из аргументов в массивеб срабатывает код.

CreateContext - создаёт класс объекта, который можно использовать с помощью метода useContext.