import { registerUser } from './users';
import {API_BASE_URL} from '../config';

describe('registerUser', () => {
  it('Should call fetch with the correct values', () => {
    const user = {user: 'testuser'}
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json() {
          return user
        }
      })
    );
    const dispatch = jest.fn()
    return registerUser(user)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:8080/api/users", {"body": "{\"user\":\"testuser\"}", "headers": {"content-type": "application/json"}, "method": "POST"});
    })
  })
})