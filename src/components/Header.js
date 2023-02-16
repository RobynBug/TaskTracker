import Button from './Button'

const Header = ({ title }) => {
    const onClick = () => {
        console.log("click")
    }
  return (
    <header className="Header">
        <h1>{title}</h1>
        <Button color="pink" text="Add" onClick={onClick} />
    </header>
  )
}


Header.defaultProps = {
    title: 'Task Tracker'
}
export default Header