const request = require('supertest');
const app=require('../index')
const movies=require('../index')

const exp_res=[
  {
      id: 1,
      name: 'ready player 1'
  },
  {
      id:2,
      name:'moana'
  },
  {
      id:3,
      name:'venom'
  }
]

const add_movie=
  {
    id: 5,
    name: 'space wars'
  }


describe('Movies test suite', () => {
  it('tests/movies/get_all', async() => {
      const response = await request(app).get("/movies");
      expect(response.body).toEqual(exp_res);
      expect(response.body).toHaveLength(3);
      expect(response.statusCode).toBe(200);
  });

  it('test/movies/post',async()=>{
    const count = movies.length;
    console.log(add_movie)
    const response=await request(app)
    .post("/movies")
    .send(add_movie);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("New movie is added to the list");
    const newCount = await movies.length;
    //expect(newCount).toBe(count + 1);
  });

  it('tests/movies/get_id', async() => {
    const response = await request(app).get("/movies/2");
    expect(response.body.name).toBe('moana');
    expect(response.statusCode).toBe(200);
  });
  it('tests/movies/get_id_error', async() => {
    const response = await request(app).get("/movies/9");
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Movie not found');
  });

  it('test/movies/delete',async()=>{
    const count = movies.length;
    const response=await request(app)
    .delete("/movies/3")
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Movie successfully deleted");
    const newCount = await movies.length;
    //expect(newCount).toBe(count - 1);
  });

});

