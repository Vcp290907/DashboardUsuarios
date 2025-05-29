const peoples = lodash.times(50, function (n) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        id: n + 1,
        firstName: firstName,
        lastName: lastName,
        avatar: faker.image.avatar(),
        address: faker.location.streetAddress(),
        email: faker.internet.email({firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase()}),
    }
})

const data = {};
data.peoples = peoples;
FileSystem.writeFile('db.json', JSON.stringify(data), (err) => {
    if(err) throw err;
    console.log('A tamo ai!');
})