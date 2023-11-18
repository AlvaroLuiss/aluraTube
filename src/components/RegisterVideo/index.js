import React, { useState } from 'react'
import { StyledRegisterVideo } from "./styles"
import { createClient } from '@supabase/supabase-js'

function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues)

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm() {
            setValues({})
        }
    }
}

const PROJECT_URL = "https://eycgkgvawqcoakewlcpc.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Y2drZ3Zhd3Fjb2FrZXdsY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMDUyNzksImV4cCI6MjAxNTY4MTI3OX0.WL3m-77IcYiS6RyszWroSnHf6vyA9Iv7LRppR143FMo"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)


// get youtube thumbnail from video url

function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}


export default function RegisterVideo() {

    const formCadastro = useForm({
        initialValues: { titulo: "Frost Punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    })

    const [formVisivel, setFormVisivel] = React.useState(false)


    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel &&
                <form onSubmit={(evento) => {
                    evento.preventDefault()

                    // Contrato entre o nosso Front e o BackEnd
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos"
                    })
                    .then(() => {
                        
                    })

                    setFormVisivel(false)
                    formCadastro.clearForm()
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>}
        </StyledRegisterVideo>
    )
}