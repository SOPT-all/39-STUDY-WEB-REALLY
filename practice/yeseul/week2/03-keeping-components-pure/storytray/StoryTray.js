export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map((story) => (
        <li key={story.id}>{story.label}</li>
      ))}
      <li> Create Story</li>
    </ul>
  );
}

/* 
export default function StoryTray({ stories }) {
  const items = [...stories, { id: "create", label: "Create Story" }];

  return (
    <ul>
      {items.map((story) => (
        <li key={story.id}>{story.label}</li>
      ))}
    </ul>
  );
}
*/
