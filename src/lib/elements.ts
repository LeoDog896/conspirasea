import { writable, derived, get } from "svelte/store"
import writableDerived from "svelte-writable-derived";

interface Position {
  x: number,
  y: number
}

export interface Element {
  imageURL?: string;
  content: string;
  id: string;
  editable?: boolean;
  position: Position;
  /** An array of other nodes they're connected to. */
  connections: string[];
  selected?: boolean;
  self?: HTMLElement;
  textarea?: HTMLTextAreaElement;
}

export interface SerializableElement {
  imageURL: string | undefined;
  content: string;
  id: string;
  position: Position;
  connections: string[];
}

function elementToSerializableElement({ imageURL, content, id, position, connections }: Element): SerializableElement {
  return {
    imageURL,
    content,
    id,
    position,
    connections
  }
}

export function elementsAsSerializableElements(elements: Element[]): SerializableElement[] {
  return elements.map(elementToSerializableElement)
}

interface Conspirasea {
  name: string;
  elements: Element[];
}

export const conspiraseas = writable<Conspirasea[]>([{
  name: "Conspirasea",
  elements: []
}])
export const conspiraseaIndex = writable(0)

export const currentConspirasea = writableDerived(
  [conspiraseas, conspiraseaIndex],
  ([$conspiraseas, $conspiraseaIndex]) => $conspiraseas[$conspiraseaIndex],
  $conspirasea => {
    conspiraseas.set(get(conspiraseas).map((it, i) => {
      if (get(conspiraseaIndex) == i) {
        return $conspirasea
      }
      return it
    }))
    return [get(conspiraseas), get(conspiraseaIndex)]
  }
);

export const elements = writableDerived(
  currentConspirasea,
  $currentConspirasea => $currentConspirasea.elements,
  $elements => ({ name: get(currentConspirasea).name, elements: $elements })
)