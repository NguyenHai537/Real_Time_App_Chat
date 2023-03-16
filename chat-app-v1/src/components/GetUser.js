import React, {useState, useEffect} from 'react'
import '../App.css'
import axios from 'axios'

// chương trình hiển thị danh sách User, sử dụng mock API
export default function GetUser() {
    const [state, setState] = useState(
        {users:[]}
    );

// BackEnd thêm @CrossOrigin(origins = "http://localhost:3000") vào RestController
// Sử dụng hàm axios.get() gọi API http://localhost:8080/list
// Sử dụng hàm then() để lấy kết quả trả về, sử dụng hàm setState để gán giá trị trả về này cho users
    useEffect(() => {
        axios
            .get("http://localhost:8080/list")
            .then(res => {
                setState({users: res.data}); 
                console.log(res.data)
            })
            .catch(err => {
                throw err;
            })
           
        },[]);

// Khai báo biến users từ state
    const {users} = state;
    return (
       <div className='App'>
        <h1>Users</h1>
        <table>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Image</th>
            </tr>
            {users.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td><img src={user.image} alt="User Image" width='100px' /></td>
                </tr>
            ))}
        </table>
        
       </div> 
    )
}
