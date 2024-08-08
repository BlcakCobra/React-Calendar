import React, { useState } from 'react';
import './Calendar.css';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);
  const [meets, setMeets] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDayClick = (day) => {
    const meeting = prompt('Введите детали встречи:', '');
    if (meeting) {
      setMeets([...meets, { date: day, details: meeting }]);
    }
  };

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo) {
      setTodoList([...todoList, newTodo]);
      setNewTodo("");
    }
  };
  const deleteTodo = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className='empty-day' />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const meeting = meets.find((m) => new Date(m.date).toDateString() === date.toDateString());
      calendarDays.push(
        <div key={day} className='day' onClick={() => handleDayClick(date)}>
          {day}
          {meeting && <div className='meeting'>{meeting.details}</div>}
        </div>
      );
    }

    return calendarDays;
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ];

  return (
    <div className='calendar-container'>
      <div className='calendar-header'>
        <button onClick={handlePrevMonth}>Назад</button>
        <span>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</span>
        <button onClick={handleNextMonth}>Вперед</button>
      </div>
      <div className='calendar-grid'>
        {['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Суб'].map((day) => (
          <div key={day} className='calendar-day-header'>{day}</div>
        ))}
        {renderCalendar()}
      </div>
      <div className='todo-list'>
        <h3>Список дел на сегодня</h3>
        <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <button onClick={addTodo}>+</button>
        <ol>
          {todoList.map((todo, index) => (
            <>
            <li key={index}>{todo}</li>
            <button onClick={() =>deleteTodo(index)}>-</button>            
            </>
          ))}
        </ol>
      </div>
    </div>
  );
}