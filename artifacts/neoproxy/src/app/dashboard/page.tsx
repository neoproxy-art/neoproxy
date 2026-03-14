'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './dashboard.module.css';

interface CatalogEntry {
  did: string;
  file_name: string;
  category: string;
  type: string;
  size_bytes: number;
  checksum: string;
  created: number;
  replicas: number;
  locations: Array<{
    endpoint: string;
    path: string;
    status: string;
    last_check: number;
  }>;
}

interface ValidationReport {
  timestamp: number;
  total_files: number;
  valid_files: number;
  corrupted_files: number;
  missing_files: number;
  quarantined_files: number;
  endpoint_summary: Record<string, any>;
}

export default function Dashboard() {
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]);
  const [validationReport, setValidationReport] = useState<ValidationReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'validation'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load catalog
      const catalogResponse = await fetch('/api/catalog');
      if (catalogResponse.ok) {
        const catalogData = await catalogResponse.json();
        setCatalog(catalogData);
      }

      // Load latest validation report
      const validationResponse = await fetch('/api/validation/latest');
      if (validationResponse.ok) {
        const validationData = await validationResponse.json();
        setValidationReport(validationData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#00ff41';
      case 'corrupted': return '#ff073a';
      case 'missing': return '#ffaa00';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading NeoProxy Data Dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NeoProxy Data Dashboard</title>
        <meta name="description" content="NeoProxy Data Management System Dashboard" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>NeoProxy Data Kernel</h1>
        <p className={styles.subtitle}>CERN Rucio-inspired Data Management System</p>
      </header>

      <nav className={styles.nav}>
        <button
          className={`${styles.navButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'catalog' ? styles.active : ''}`}
          onClick={() => setActiveTab('catalog')}
        >
          Data Catalog
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'validation' ? styles.active : ''}`}
          onClick={() => setActiveTab('validation')}
        >
          Validation
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === 'overview' && (
          <div className={styles.overview}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Total Files</h3>
                <div className={styles.statValue}>{catalog.length}</div>
              </div>

              <div className={styles.statCard}>
                <h3>Total Replicas</h3>
                <div className={styles.statValue}>
                  {catalog.reduce((sum, entry) => sum + entry.replicas, 0)}
                </div>
              </div>

              <div className={styles.statCard}>
                <h3>Data Volume</h3>
                <div className={styles.statValue}>
                  {formatBytes(catalog.reduce((sum, entry) => sum + entry.size_bytes, 0))}
                </div>
              </div>

              {validationReport && (
                <div className={styles.statCard}>
                  <h3>Integrity Status</h3>
                  <div className={styles.statValue}>
                    {validationReport.valid_files}/{validationReport.total_files} Valid
                  </div>
                </div>
              )}
            </div>

            <div className={styles.categoriesChart}>
              <h3>Data Categories</h3>
              <div className={styles.categoryList}>
                {Object.entries(
                  catalog.reduce((acc, entry) => {
                    acc[entry.category] = (acc[entry.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <div key={category} className={styles.categoryItem}>
                    <span className={styles.categoryName}>{category}</span>
                    <span className={styles.categoryCount}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className={styles.catalog}>
            <div className={styles.catalogHeader}>
              <h2>Data Catalog</h2>
              <button className={styles.refreshButton} onClick={loadData}>
                Refresh
              </button>
            </div>

            <div className={styles.catalogTable}>
              <table>
                <thead>
                  <tr>
                    <th>DID</th>
                    <th>File Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Replicas</th>
                    <th>Created</th>
                    <th>Locations</th>
                  </tr>
                </thead>
                <tbody>
                  {catalog.map((entry) => (
                    <tr key={entry.did}>
                      <td className={styles.did}>{entry.did}</td>
                      <td>{entry.file_name}</td>
                      <td>{entry.category}</td>
                      <td>{entry.type}</td>
                      <td>{formatBytes(entry.size_bytes)}</td>
                      <td>{entry.replicas}</td>
                      <td>{formatDate(entry.created)}</td>
                      <td>
                        <div className={styles.locations}>
                          {entry.locations.map((location, index) => (
                            <span
                              key={index}
                              className={styles.locationBadge}
                              style={{ backgroundColor: getStatusColor(location.status) }}
                              title={`${location.endpoint}: ${location.status}`}
                            >
                              {location.endpoint}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'validation' && validationReport && (
          <div className={styles.validation}>
            <h2>Integrity Validation Report</h2>
            <p className={styles.reportTime}>
              Last validation: {formatDate(validationReport.timestamp)}
            </p>

            <div className={styles.validationStats}>
              <div className={styles.validationCard}>
                <h3>Valid Files</h3>
                <div className={styles.validationValue} style={{ color: '#00ff41' }}>
                  {validationReport.valid_files}
                </div>
              </div>

              <div className={styles.validationCard}>
                <h3>Corrupted Files</h3>
                <div className={styles.validationValue} style={{ color: '#ff073a' }}>
                  {validationReport.corrupted_files}
                </div>
              </div>

              <div className={styles.validationCard}>
                <h3>Missing Files</h3>
                <div className={styles.validationValue} style={{ color: '#ffaa00' }}>
                  {validationReport.missing_files}
                </div>
              </div>

              <div className={styles.validationCard}>
                <h3>Quarantined</h3>
                <div className={styles.validationValue} style={{ color: '#ff6b35' }}>
                  {validationReport.quarantined_files}
                </div>
              </div>
            </div>

            <div className={styles.endpointSummary}>
              <h3>Endpoint Status</h3>
              {Object.entries(validationReport.endpoint_summary).map(([endpoint, stats]) => (
                <div key={endpoint} className={styles.endpointCard}>
                  <h4>{endpoint}</h4>
                  <div className={styles.endpointStats}>
                    <span>Valid: {stats.valid}/{stats.total}</span>
                    <span>Corrupted: {stats.corrupted}</span>
                    <span>Missing: {stats.missing}</span>
                  </div>
                </div>
              ))}
            </div>

            {validationReport.corrupted_files > 0 && (
              <div className={styles.corruptedFiles}>
                <h3>Corrupted Files</h3>
                <p>Total corrupted: {validationReport.corrupted_files}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}