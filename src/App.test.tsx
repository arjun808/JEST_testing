import { render,screen } from "@testing-library/react";
import App from "./App";
test("check App",()=>{
    render(<App/>)
    const text=screen.getByText("Todo app")
    expect(text).toBeInTheDocument()
})