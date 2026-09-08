const dropNullEntries = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => Boolean(v))
    );

export default dropNullEntries;
