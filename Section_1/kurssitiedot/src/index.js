import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part}: {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const part1 = props.parts[0].name
  const exercises1 = props.parts[0].exercises
  const part2 = props.parts[1].name
  const exercises2 = props.parts[1].exercises
  const part3 = props.parts[2].name
  const exercises3 = props.parts[2].exercises

  return (
    <Fragment>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </Fragment>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <Fragment>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </Fragment>
  )
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'))