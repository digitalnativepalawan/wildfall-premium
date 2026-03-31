import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  data: any;
}

export function useContent() {
  const [content, setContent] = useState<Record<string, SectionContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "content"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newContent: Record<string, SectionContent> = {};
      snapshot.forEach((doc) => {
        newContent[doc.id] = { id: doc.id, ...doc.data() } as SectionContent;
      });
      setContent(newContent);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSection = async (id: string, data: Partial<SectionContent>) => {
    await setDoc(doc(db, "content", id), data, { merge: true });
  };

  return { content, loading, updateSection };
}
