import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>Project by
    <ul>
      <li>Hippolyte LEVIVIER</li>
      <li>Nils LESAGE</li>
      <li>Mathis RUCHOT</li>
      <li>Théo MEILLIEZ</li>
      <li>Jeremy SICARD</li>
    </ul>
  </div>
}
