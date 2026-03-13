#!/bin/bash

# NeoProxy Artifact Pipeline: STL -> GLB Converter
# Depends on: assimp-utils

STL_DIR="./public/stls"
GLB_DIR="./public/models"

# Ensure output directory exists
mkdir -p "$GLB_DIR"

echo "Starting conversion of STL artifacts to GLB..."

# Count files
TOTAL=$(ls "$STL_DIR"/*.stl 2>/dev/null | wc -l)
CURRENT=0

if [ "$TOTAL" -eq 0 ]; then
    echo "No STL files found in $STL_DIR"
    exit 0
fi

for f in "$STL_DIR"/*.stl; do
    ((CURRENT++))
    filename=$(basename "$f")
    name="${filename%.stl}"
    
    # Check if GLB already exists and is newer than STL
    if [ "$GLB_DIR/$name.glb" -nt "$f" ]; then
        # echo "[$CURRENT/$TOTAL] Skipping $name (up to date)"
        continue
    fi

    echo "[$CURRENT/$TOTAL] Converting $name..."
    
    # Use assimp to export to GLB
    # We use -lb (log binary) and potentially other flags if needed
    assimp export "$f" "$GLB_DIR/$name.glb" -embnorm > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  - Success: $name.glb created."
    else
        echo "  - Error: Failed to convert $name."
    fi
done

echo "Conversion complete. $TOTAL artifacts processed."
