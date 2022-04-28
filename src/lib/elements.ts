import { writable } from "svelte/store"

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

export const elements = writable<Element[]>([])