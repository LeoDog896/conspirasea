import { writable, get } from "svelte/store"
import writableDerived from "svelte-writable-derived";

interface Position {
  x: number,
  y: number
}

export interface Element {
  /** The image URL. Optional */
  imageURL?: string;
  /** The content of the element */
  content: string;
  /** The ID of the element. Generated via crypto's UUID method */
  id: string;
  /** If the element is currently editable. One at a time */
  editable?: boolean;
  /** The position of the element on the screen. */
  position: Position;
  /** An array of other nodes they're connected to with the ID property */
  connections: string[];
  /** If the element is currently selected. Not used for serialization */
  selected?: boolean;
  /** A reference to the self's element */
  self?: HTMLElement;
  /** A reference to the text area inside the element. Used for ".focus" */
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
  editable?: boolean;
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