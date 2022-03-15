const express = require('express')
const app = express()

app.use(express.json())

const players = [
    {
        id: 1,
        nome: "Neymar e Cirilo - SUPER",
        habilidade: 100,
        resenha: 100,
        perna: 100,
        status: 'ativo'
    },
    {
        id: 2,
        nome: "Ronaldinho Gaúcho",
        habilidade: 95,
        resenha: 90,
        perna: 20,
        status: 'ativo'
    },
    {
        id: 3,
        nome: "Marcelinho Carioca",
        habilidade: 75,
        resenha: 50,
        perna: 30,
        status: 'ativo'
    },
    {
        id: 4,
        nome: "Adriano Imperador",
        habilidade: 90,
        resenha: 95,
        perna: 40,
        status: 'ativo'
    },
    {
        id: 5,
        nome: "Aloísio Chulapa",
        habilidade: 65,
        resenha: 80,
        perna: 50,
        status: 'ativo'
    },
    {
        id: 6,
        nome: "Ronaldo Fenômeno",
        habilidade: 95,
        resenha: 50,
        perna: 40,
        status: 'ativo'
    },
    {
        id: 7,
        nome: "Vampeta",
        habilidade: 60,
        resenha: 90,
        perna: 60,
        status: 'ativo'
    },
    {
        id: 8,
        nome: "Romario",
        habilidade: 90,
        resenha: 80,
        perna: 85,
        status: 'ativo'
    },
    {
        id: 9,
        nome: "Denilson",
        habilidade: 80,
        resenha: 65,
        perna: 75,
        status: 'ativo'
    },
    {
        id: 10,
        nome: "Amaral",
        habilidade: 65,
        resenha: 75,
        perna: 30,
        status: 'ativo'
    },
    {
        id: 11,
        nome: "Pelé",
        habilidade: 80,
        resenha: 40,
        perna: 10,
        status: 'ativo'

    },
    {
        id: 12,
        nome: "Lionel Messi",
        habilidade: 90,
        resenha: 30,
        perna: 20,
        status: 'ativo'
    },
    {
        id: 13,
        nome: "Cristiano Ronaldo",
        habilidade: 90,
        resenha: 50,
        perna: 40,
        status: 'ativo'
    },
    {
        id: 14,
        nome: "Kylian Mbappé",
        habilidade: 85,
        resenha: 60,
        perna: 40,
        status: 'ativo'
    },
    {
        id: 15,
        nome: "Marinho",
        habilidade: 75,
        resenha: 80,
        perna: 30,
        status: 'ativo'
    },
    {
        id: 16,
        nome: "Alisson",
        habilidade: 60,
        resenha: 60,
        perna: 20,
        status: 'ativo',
    },
]

app.get('/', function (req, res) {
    res.send({
        Name: 'CRUD OF SOCCER PLAYERS',
        Description: 'This application performs the CRUD of soccer players with Nodejs + Express',
        Author: 'Igor Mozetic',
        License: "ISC",
    })
})

// GET - READ
app.get('/players', function (req, res) {
    res.send(players.filter(p => p.status !== 'deletado'))
})

// GET - READ ELEMENT BY ID
app.get('/players/:id', function (req, res) {
    const id = +req.params.id
    const player = players.find(p => p.id === id)

    if (!player) {
        res.status(404).send({ return: "O jogador com o id informado não foi encontrado." })
        return;
    }
    res.send(player)
})

// POST - CREAD
app.post('/create', function (req, res) {
    const player = req.body;
    if (player.nome != null && player.habilidade != null && player.resenha != null && player.perna != null) {
        const lastPlayer = players.slice(-1);
        player.id = lastPlayer[0].id + 1;
        player.status = 'ativo';
        players.push(player)
        res.send({ return: "O jogador foi adicionado com sucesso." })
    } else {
        res.status(404).send({ return: "O jogador não foi adicionado pois não contém informações." })
    }
})

// DELETE - DELTE
app.delete('/delete/:id', function (req, res) {
    const id = +req.params.id
    const player = players.find(p => p.id === id)

    if (!player) {
        res.status(404).send({ return: "Não foi encontrado nenhum jogador com o id informado." })
        return;
    }
    // status de ativo ou atualizado para deletado
    // player.status = 'deletado'

    // player realmente deletado
    const indexPlayer = players.indexOf(player)
    delete players[indexPlayer]

    res.send({ return: "O jogador foi excluído com sucesso!" })
})

// UPDATE - UPDATE
app.put('/update/:id', function (req, res) {
    const id = +req.params.id
    const player = players.find(p => p.id === id)
    if (!player) {
        res.status(404).send({ return: "Não foi encontrado nenhum jogador com o id informado." })
        return;
    }

    const { nome, habilidade, resenha, perna } = req.body;
    if (nome != null && habilidade != null && resenha != null && perna != null) {
        player.nome = nome;
        player.habilidade = habilidade;
        player.resenha = resenha;
        player.perna = perna;
        player.status = "atualizado"
        res.send({ return: "O jogador foi atualizado com sucesso." })
    } else {
        res.status(404).send({ return: "O jogador não foi atualiado pois não contém todas as informações." })
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('O Servidor está sendo executado')
})