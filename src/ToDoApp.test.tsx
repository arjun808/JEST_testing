import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoApp from './ToDoApp';

test('should add a new toDo item', () => {
 
  render(<ToDoApp />);


  const inputElement = screen.getByPlaceholderText("Enter what you want to do");
  const addButton = screen.getByText("➕");




  


  fireEvent.change(inputElement, { target: { value: 'Learn Jest' } });


  fireEvent.click(addButton);


  const todoItem = screen.getByText("Learn Jest");
  expect(todoItem).toBeInTheDocument();
});

test('should delete a toDo item', () => {
   
    render(<ToDoApp />);
  
  
    const inputElement = screen.getByPlaceholderText("Enter what you want to do");
    const addButton = screen.getByText("➕");
  

    fireEvent.change(inputElement, { target: { value: 'Learn TypeScript' } });
    fireEvent.click(addButton);
  
  
    const todoItem = screen.getByText("Learn TypeScript");
    expect(todoItem).toBeInTheDocument();
  
   
    const deleteButton = screen.getByText("🗑️");
  
   
    fireEvent.click(deleteButton);
  
  
    expect(todoItem).not.toBeInTheDocument();
  });


  test('should check and uncheck a toDo item', () => {
    
    render(<ToDoApp />);
  
   
    const inputElement = screen.getByPlaceholderText("Enter what you want to do");
    const addButton = screen.getByText("➕");
  
    
    fireEvent.change(inputElement, { target: { value: 'Learn TypeScript' } });
    fireEvent.click(addButton);
  
   
    const todoItem = screen.getByText("Learn TypeScript");
    expect(todoItem).toBeInTheDocument();
  
  
    const checkButton = screen.getByText("❌");
  
  
    fireEvent.click(checkButton);
  
   
    const doneButton = screen.getByText("✅");
    expect(doneButton).toBeInTheDocument();
  

    fireEvent.click(doneButton);
  
  
    const notDoneButton = screen.getByText("❌");
    expect(notDoneButton).toBeInTheDocument();
  });
 