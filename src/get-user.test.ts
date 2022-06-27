import { getUser } from "./get-user";

describe("When everything is ok", () => {
   test("should return a response", async () => {
      //In a real project, you would use Axios and mock the get method
      const result = await getUser();
      expect(result).toEqual({ is: '1', name: 'David' });

   });
});