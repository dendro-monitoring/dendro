export default function trim(s: string): string {
  return s.replace( /^\s+|\s+$/g, '' );
}
