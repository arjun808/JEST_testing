import axios from 'axios'
import React, { ChangeEvent, Component } from 'react'

interface ToDo {
    id: number,
    title: string,
    completed: boolean,
    userId: number,
}

interface ApiReturn {
    data: ToDo[],
    value: string
}

export default class TodoByApi extends Component<{}, ApiReturn> {
    constructor(props: {}) {
        super(props)
        this.state = {
            data: [],
            value: ""
        }
    }

    getData = async () => {
        const result = await axios.get<ToDo[]>("https://jsonplaceholder.typicode.com/todos")
        this.setState({ data: result.data })
    }

    componentDidMount(): void {
        this.getData();
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value })
    }

    handleCompletedClick = async (id: number, completed: boolean) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                completed: !completed
            });

            // this.setState((prevState) => ({
            //     data: prevState.data.map(todo => 
            //         todo.id === id ? { ...todo, completed: !completed } : todo
            //     )
            // }));
            this.getData();
           
        } catch (err) {
            console.error(err);
        }
    }

    handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

            this.setState((prevState) => ({
                data: prevState.data.filter(todo => todo.id !== id)
            }));
        } catch (err) {
            console.error(err);
        }
    }
    handleAddClick=async()=>{
        try{

        }catch(err){
            console.log(err)
        }
    }

    render() {
        const { data } = this.state;
        return (
            <div>
                {data && data.map((obj,index) => {
                    return (
                        <div key={obj.id}>
                            <span>{index+1}</span>
                            <span>{obj.title}</span>
                            <span onClick={() => this.handleCompletedClick(obj.id, obj.completed)}>
                                {obj.completed ? "✅" : "❌"}
                            </span>
                            <button onClick={() => this.handleDelete(obj.id)}>Delete</button>
                        </div>
                    )
                })}
                <div>
                    <input onChange={this.handleChange} placeholder='Write what you want to do'></input>
                    <button onClick={this.handleAddClick}>Add Todo</button>
                </div>
            </div>
        )
    }
}
