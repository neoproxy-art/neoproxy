import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const kernelDir = path.join(process.cwd(), 'kernel');

    // Check if kernel directory exists
    try {
      await fs.access(kernelDir);
    } catch {
      return NextResponse.json(
        { error: 'Kernel directory not found' },
        { status: 404 }
      );
    }

    // Find latest validation report
    const files = await fs.readdir(kernelDir);
    const validationReports = files
      .filter(file => file.startsWith('validation_report_') && file.endsWith('.json'))
      .sort()
      .reverse();

    if (validationReports.length === 0) {
      return NextResponse.json(
        { error: 'No validation reports found' },
        { status: 404 }
      );
    }

    // Read latest report
    const latestReportPath = path.join(kernelDir, validationReports[0]);
    const reportData = await fs.readFile(latestReportPath, 'utf-8');
    const report = JSON.parse(reportData);

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error reading validation report:', error);
    return NextResponse.json(
      { error: 'Failed to read validation report' },
      { status: 500 }
    );
  }
}