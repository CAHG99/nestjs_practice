import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { ObjectLiteral, Repository } from 'typeorm';

export const populateFromCSV = async<T extends ObjectLiteral>(
  repository: Repository<T>,
  filePath: string,
): Promise<void> => {
  try {
    const absolutePath = path.resolve(filePath);
    const results: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(absolutePath)
        .pipe(csv())
        .on('data', (row) => {
          const cleanedRow = Object.fromEntries(
            Object.entries(row).map(([key, value]) => [
              key.trim(),
              value?.toString().trim() || null,
            ]),
          );
          results.push(cleanedRow);
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });

    if (results.length === 0) {
      console.warn(`⚠️ No se encontraron registros en ${filePath}`);
      return;
    }

    await repository.insert(results);
    console.log(`✅ ${repository.metadata.name}: ${results.length} registros importados desde ${filePath}`);
  } catch (error) {
    console.error(`❌ Error importando ${repository.metadata.name}:`, error);
  }
};
