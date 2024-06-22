const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/actors'

let actorId

const actor = {
    firstName: "Robert",
    lastName: "Downey",
    nationality: "Estados Unidos",
    image: "*lorem.png*",
    birthday: "1965-04-04"
}

afterAll(async () => {
    await request(app).delete(`${BASE_URL}/${actorId}`);
 });


test('POST --> "BASE_URL" should return status code 201 and res.body.firstName === actor.firstName', async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test('GET --> "BASE_URL" should return status codee 200 and res.body[0].firstName === actor.firstName', async () => {
    const res = await request(app)
        .get(BASE_URL)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()

    expect(res.body).toHaveLength(1)
    expect(res.body[0].firstName).toBe(actor.firstName)
});

test('GET --> "BASE_URL/:id" should return status codee 200 and res.body.firstName === actor.firstName', async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test('PUT --> "BASE_URL/:id" should  return status code 200 and res.body.firstName === actorUpdate.firstName', async () => {
    const actorUpdate = {
        firstName: "Thomas",
        lastName: "Kane ",
        nationality: " Estados Unidos",
        image: "*lorem.png*",
        birthday: "1962 -01-15 "
    }

    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

test('DELETE --- > "BASE_URL/:id" should return status code 204', async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.statusCode).toBe(204)
})


