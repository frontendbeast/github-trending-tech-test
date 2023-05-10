import { fireEvent, render, screen } from '@testing-library/react'
import Home from './repo-card'
import RepoCard from './repo-card'

const data = {
    createdAt: "2023-05-05T16:35:37Z",
    description: "🤖 A list of open LLMs available for commercial use.",
    id: "R_kgDOJfSZVw",
    name: "open-llms",
    stargazers: {
        totalCount: 3147
    },
    url: "https://github.com/eugeneyan/open-llms"
}

describe('Home', () => {
  it('renders the correct data', () => {
    const setFavs = jest.fn()

    render(<RepoCard {...data} favs={[]} setFavs={setFavs} />)


    expect(screen.getByText('open-llms')).toBeTruthy()
    expect(screen.getByText("🤖 A list of open LLMs available for commercial use.")).toBeTruthy()
    expect(screen.getByText("3147")).toBeTruthy()
  })
  it('handles toggleFav button click', () => {
    const onClick = jest.fn()

    render(<RepoCard {...data} favs={[]} setFavs={onClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
