import { useParams } from "react-router-dom"

export default function UserDetails() {
      const [userList, setUserList] = useState([]);
    
      useEffect(() => {
        axios
          .get(`http://localhost:8080/get-user-by-id`)
          .then(res => {
            setUserList(res.data);
          })
          .catch(err => {
            throw err;
          });
      }, []);
    
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td><img src={user.image} alt="img"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }