export function concatenate(strings, separator){
    return strings.join(separator);
}

export function erase(data){
    return data.filter(Boolean);
}

export function countPrefixes(words, str) {
    let count = 0;
    for (let word of words) {
      if (str.startsWith(word)) {
        count++;
      }
    }
    return count;
}

export function findAnagrams(words) {
    const map = new Map();
    
    for (let word of words) {
        if (typeof word !== 'string' || !word.trim()) continue;
      const key = word.split('').sort().join('');
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(word);
    }
  
    const groups = Array.from(map.values())
    .filter(group => group.length > 1)
    .map(group => group.sort())
    .sort((a, b) => a[0].localeCompare(b[0]));

    const outputString = groups.map(group => group.join(', ')).join('<br>');

    return outputString;
  }