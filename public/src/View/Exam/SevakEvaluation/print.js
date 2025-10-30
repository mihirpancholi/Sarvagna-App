document.addEventListener('DOMContentLoaded', async () => {
    const pathParts = window.location.pathname.split('/');
    const evaluationId = pathParts[pathParts.length - 1];

    if (!evaluationId) {
        alert('No evaluation ID found!');
        return;
    }

    try {
        const response = await fetch(`/SevakEvaluation/api/print-data/${evaluationId}`);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        const data = result.data;
        const table = document.getElementById('report-table');

        const fields = [
            { label: 'Talim Batch', value: data.talim_batch_name },
            { label: 'YTK ID', value: data.ytk_id },
            { label: 'Sevak Name', value: data.sevak_name },
            { label: 'Satsang', value: `${data.satsang_grade_name} - ${data.satsang_notes || ''}` },
            { label: 'Seva', value: `${data.seva_grade_name} - ${data.seva_notes || ''}` },
            { label: 'Human Relations', value: `${data.human_relations_grade_name} - ${data.human_relations_notes || ''}` },
            { label: 'Skill', value: `${data.skill_grade_name} - ${data.skill_notes || ''}` },
            { label: 'Abhyas (Education)', value: `${data.abhyas_grade_name} - ${data.abhyas_notes || ''}` },
            { label: 'Family Economic Status', value: `${data.family_ecostatus_grade_name} - ${data.family_ecostatus_notes || ''}` },
            { label: 'Family Satsang', value: `${data.family_satsang_grade_name} - ${data.family_satsang_notes || ''}` },
            { label: 'Overall', value: `${data.overall_grade_name} - ${data.overall_notes || ''}` },
            { label: 'Remarks', value: data.remarks || '' }
        ];

        let tableContent = '';
        fields.forEach(field => {
            tableContent += `
                        <tr>
                            <th>${field.label}</th>
                            <td>${field.value}</td>
                        </tr>
                    `;
        });

        table.innerHTML = tableContent;

    } catch (error) {
        document.body.innerHTML = `<p>Error loading report: ${error.message}</p><a href="/SevakEvaluation">Back to List</a>`;
    }
});