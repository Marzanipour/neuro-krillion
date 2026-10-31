import {EXPANSION} from './bank-expansion.js';
import {ADDITIONS} from './bank-additions.js';
import {buildPlayBank} from './bank-play.js';
// Original, editorially scored educational bank. Scores are not survey frequencies.
// Row: canonical answer | points | explanation | optional aliases separated by ~
const sets = [
['transmitters','Name a neurotransmitter or neuromodulator.','Chemical messengers','Think beyond dopamine. A messenger from your sleep or pain lectures could be the gem.','Acetylcholine','https://www.ncbi.nlm.nih.gov/books/NBK10799/',`
Dopamine|10|Modulates movement, motivation and reinforcement learning.|DA
Serotonin|15|A monoamine involved in sleep, mood and many other functions.|5-HT~5HT
GABA|30|The major inhibitory neurotransmitter in the adult brain.|gamma aminobutyric acid~gamma-aminobutyric acid
Glutamate|30|The major excitatory neurotransmitter in the brain.
Norepinephrine|60|Arousal and attention are among its many roles.|noradrenaline~NE
Glycine|60|An inhibitory transmitter in the spinal cord and brainstem.
Histamine|85|Histaminergic neurons help sustain wakefulness.
Substance P|85|A neuropeptide involved in nociceptive signaling.
Nitric oxide|85|A gas that acts as a diffusible neural messenger.|NO
Adenosine|85|A neuromodulator linked to sleep pressure; caffeine blocks its receptors.
Acetylcholine|100|Drives skeletal-muscle activation and modulates attention and memory.|ACh
Endocannabinoids|85|Retrograde messengers that can reduce presynaptic transmitter release.|endocannabinoid~anandamide~2-AG
Endorphins|60|Endogenous opioid peptides that modulate pain.|endorphin~beta endorphin
Orexin|85|A hypothalamic peptide that supports wakefulness.|hypocretin
ATP|60|Also acts as a purinergic signaling molecule.|adenosine triphosphate
Neuropeptide Y|85|A peptide involved in feeding, stress and neural excitability.|NPY
Vasopressin|85|A hypothalamic peptide with hormonal and central signaling roles.|ADH
Oxytocin|60|A peptide with peripheral hormonal and central neuromodulatory functions.
`],
['regions','Name a structure in the human brain.','Neuroanatomy','Big regions count. A small structure from the sleep chapter can reach the top.','Suprachiasmatic nucleus','https://www.ncbi.nlm.nih.gov/books/NBK11154/',`
Cerebellum|10|Contributes to coordination, prediction and motor learning.
Hippocampus|15|Important for forming episodic memories and spatial representations.
Amygdala|30|Helps assign significance to stimuli and supports emotional learning.
Thalamus|30|Routes and transforms many signals headed to cortex.
Hypothalamus|30|Coordinates homeostatic, autonomic and endocrine functions.
Medulla|60|Contains circuits involved in breathing and cardiovascular control.|medulla oblongata
Pons|60|A brainstem region involved in sleep, motor and sensory functions.
Midbrain|60|Contains structures important for movement and sensory orienting.|mesencephalon
Substantia nigra|85|Its pars compacta supplies dopamine to the striatum.
Locus coeruleus|85|A major source of noradrenergic projections.
Superior colliculus|85|Helps direct orienting movements toward stimuli.
Suprachiasmatic nucleus|100|The hypothalamic circadian clock, taught in introductory sleep lectures.|SCN
Corpus callosum|30|The largest white-matter connection between the cerebral hemispheres.
Caudate nucleus|60|Part of the dorsal striatum.|caudate
Putamen|60|Part of the dorsal striatum involved in action selection.
Globus pallidus|85|A basal-ganglia structure with internal and external segments.
Nucleus accumbens|60|A ventral striatal region involved in motivated behavior.|accumbens
Insula|60|Contributes to interoception, taste and other functions.|insular cortex
Cingulate cortex|85|A medial cortical region involved in cognition and affect.|cingulate
Pineal gland|60|Secretes melatonin.
Olfactory bulb|60|An early processing station for smell.
Prefrontal cortex|30|Contributes to working memory, planning and cognitive control.|PFC
`],
['glia','Name a type of glial cell.','Cells of the nervous system','Remember the cells that wrap axons outside the brain.','Schwann cell','https://www.ncbi.nlm.nih.gov/books/NBK10869/',`
Astrocyte|10|Supports synapses, extracellular homeostasis and the neurovascular interface.|astrocytes~astroglia
Microglia|30|Resident immune cells of the central nervous system.|microglial cell
Oligodendrocyte|60|Forms myelin around central nervous system axons.|oligodendrocytes
Ependymal cell|60|Lines the brain ventricles and central canal.|ependymocyte~ependymal
Schwann cell|100|Myelinates peripheral axons; each myelinating cell serves one internode.|Schwann~Schwann cells~neurolemmocyte
Satellite glial cell|85|Surrounds neuronal cell bodies in peripheral ganglia.|satellite cell~satellite glia
Radial glia|85|Developmental progenitors that also guide migrating neurons.|radial glial cell
Oligodendrocyte precursor cell|85|A progenitor that can differentiate into an oligodendrocyte.|OPC~NG2 glia
Bergmann glia|85|Specialized radial astrocytes in the cerebellum.|Bergmann glial cell
Müller glia|85|The principal radial glia of the retina.|Muller glia~Muller cell~Müller cell
`],
['neuron','Name a part of a neuron.','Cellular neuroscience','The gap between myelin segments is a good place to look.','Node of Ranvier','https://www.ncbi.nlm.nih.gov/books/NBK10930/',`
Axon|10|Carries signals away from the cell body toward targets.
Dendrite|10|A branching structure that receives and integrates many inputs.|dendrites
Soma|30|The cell body containing the nucleus.|cell body~perikaryon
Nucleus|30|Contains the cell genome.
Axon terminal|30|A presynaptic ending that can release neurotransmitter.|terminal bouton~synaptic terminal~bouton
Myelin sheath|60|An insulating wrapping around some axons.|myelin
Axon hillock|60|The region where the axon emerges from the soma.|hillock
Axon initial segment|85|A specialized zone where action potentials commonly initiate.|initial segment~AIS
Dendritic spine|85|A small dendritic protrusion receiving many excitatory synapses.|spine~dendritic spines
Node of Ranvier|100|A myelin gap rich in voltage-gated channels, enabling saltatory conduction.|Ranvier node~nodes of Ranvier~node
Synaptic vesicle|60|Stores neurotransmitter in a presynaptic terminal.|vesicle
Postsynaptic density|85|A protein-rich specialization beneath the postsynaptic membrane.|PSD
Microtubule|85|A cytoskeletal track used for intracellular transport.|microtubules
Nissl substance|85|Rough endoplasmic reticulum and ribosomes in neuronal somata.|Nissl bodies
`],
['cranial','Name one of the twelve cranial nerves.','The peripheral nervous system','The wandering nerve is famous. The little eye-movement nerve is the gem.','Trochlear nerve','https://www.ncbi.nlm.nih.gov/books/NBK542236/',`
Vagus nerve|10|Cranial nerve X; carries extensive visceral and parasympathetic signals.|vagus~CN X~cranial nerve 10
Optic nerve|10|Cranial nerve II; transmits visual information from the retina.|optic~CN II~cranial nerve 2
Olfactory nerve|30|Cranial nerve I; carries smell signals.|olfactory~CN I~cranial nerve 1
Trigeminal nerve|30|Cranial nerve V; facial sensation and muscles of mastication.|trigeminal~CN V~cranial nerve 5
Facial nerve|60|Cranial nerve VII; facial expression, taste and other functions.|facial~CN VII~cranial nerve 7
Vestibulocochlear nerve|60|Cranial nerve VIII; hearing and balance.|vestibulocochlear~auditory nerve~CN VIII~cranial nerve 8
Oculomotor nerve|60|Cranial nerve III; controls most extraocular muscles.|oculomotor~CN III~cranial nerve 3
Abducens nerve|85|Cranial nerve VI; innervates the lateral rectus muscle.|abducens~CN VI~cranial nerve 6
Glossopharyngeal nerve|85|Cranial nerve IX; taste, swallowing and visceral sensation.|glossopharyngeal~CN IX~cranial nerve 9
Accessory nerve|85|Cranial nerve XI; controls sternocleidomastoid and trapezius.|accessory~spinal accessory~CN XI~cranial nerve 11
Hypoglossal nerve|85|Cranial nerve XII; innervates tongue muscles.|hypoglossal~CN XII~cranial nerve 12
Trochlear nerve|100|Cranial nerve IV; innervates the superior oblique eye muscle.|trochlear~CN IV~cranial nerve 4
`],
['methods','Name a method used to study the nervous system.','Tools of neuroscience','Think of a technique from the classic action-potential experiments.','Patch clamp','https://www.brainfacts.org/neuroscience-in-society/how-science-works',`
MRI|10|Magnetic resonance imaging provides structural images.|magnetic resonance imaging~structural MRI
EEG|30|Electroencephalography records electrical potential differences at the scalp.|electroencephalography
fMRI|30|Functional MRI commonly measures the blood-oxygen-level-dependent signal.|functional MRI~functional magnetic resonance imaging
PET|60|Positron emission tomography detects signals from radioactive tracers.|positron emission tomography
CT|30|Computed tomography creates images using X-rays.|CAT scan~computed tomography
MEG|85|Magnetoencephalography detects magnetic fields generated by neural activity.|magnetoencephalography
TMS|60|Transcranial magnetic stimulation can perturb cortical activity.|transcranial magnetic stimulation
Optogenetics|85|Uses light-sensitive proteins to manipulate selected cells.
Patch clamp|100|Records currents through channels or across cell membranes.|patch clamping~patch-clamp
Single-unit recording|60|Measures spikes from an individual neuron.|single unit~single cell recording
Calcium imaging|85|Uses calcium indicators as an indirect readout of cell activity.
Lesion study|60|Studies functional consequences of damage to a region.|lesion~lesion studies
Voltage clamp|85|Holds membrane voltage while measuring current.
Electron microscopy|85|Reveals ultrastructure such as synapses.|EM
Immunohistochemistry|85|Uses antibodies to locate molecules in tissue.|IHC
Golgi stain|60|Labels a sparse subset of neurons, revealing their shapes.|Golgi staining~Golgi method
Diffusion MRI|85|Measures water diffusion to investigate tissue organization.|DTI~diffusion tensor imaging
`],
['ions','Name an ion involved in neural signaling.','Electrical signaling','The ion that triggers vesicle release can earn the top score.','Calcium','https://www.ncbi.nlm.nih.gov/books/NBK11036/',`
Sodium|10|Sodium influx underlies the upstroke of many neuronal action potentials.|Na~Na+~sodium ion
Potassium|30|Potassium conductance is central to resting voltage and repolarization.|K~K+~potassium ion
Chloride|60|Chloride permeability contributes to many inhibitory synaptic responses.|Cl~Cl-~chloride ion
Calcium|100|Calcium entry triggers neurotransmitter release at many synapses.|Ca~Ca2+~calcium ion
Magnesium|85|Produces the voltage-dependent block of NMDA receptor channels.|Mg~Mg2+~magnesium ion
Hydrogen|85|Protons modulate excitability and activate acid-sensing ion channels.|H~H+~proton~protons
Bicarbonate|85|Can flow through GABA-A channels and influence inhibitory responses.|HCO3~HCO3-~bicarbonate ion
`],
['receptors','Name a neurotransmitter receptor or receptor family.','Synaptic transmission','A receptor from your learning-and-memory lecture is the gem.','NMDA receptor','https://www.ncbi.nlm.nih.gov/books/NBK10830/',`
Dopamine receptor|10|A family of metabotropic receptors activated by dopamine.|dopamine
GABA-A receptor|30|A ligand-gated anion channel.|GABAA~GABA A
AMPA receptor|60|A glutamate-gated cation channel mediating fast excitation.|AMPA~AMPAR
NMDA receptor|100|A glutamate receptor whose voltage dependence helps detect coincident activity.|NMDA~NMDAR
Nicotinic receptor|60|An acetylcholine-gated cation channel.|nicotinic acetylcholine receptor~nAChR
Muscarinic receptor|60|A metabotropic acetylcholine receptor.|muscarinic acetylcholine receptor~mAChR
GABA-B receptor|85|A metabotropic receptor that can regulate potassium and calcium channels.|GABAB~GABA B
Kainate receptor|85|An ionotropic glutamate receptor family.|kainate
Metabotropic glutamate receptor|85|A G-protein-coupled glutamate receptor.|mGluR
Glycine receptor|60|A ligand-gated anion channel important in spinal inhibition.|GlyR
5-HT3 receptor|85|An ionotropic serotonin receptor.|5HT3~5-HT3
CB1 receptor|85|A cannabinoid receptor that often regulates presynaptic release.|CB1~cannabinoid receptor 1
P2X receptor|85|An ATP-gated cation channel.|P2X
Opioid receptor|60|A receptor family activated by endogenous opioid peptides.|mu opioid receptor
`],
['memory','Name a type or form of memory.','Learning and memory','Remember the brief persistence of a visual impression.','Iconic memory','https://www.ncbi.nlm.nih.gov/books/NBK10944/',`
Short-term memory|10|Temporary retention over brief intervals.|short term
Long-term memory|10|Retention over longer periods.|long term
Working memory|30|Maintaining and manipulating information for an ongoing task.
Episodic memory|30|Memory for events in their personal context.|episodic
Semantic memory|30|Memory for facts, concepts and meanings.|semantic
Procedural memory|60|Memory expressed through learned skills and habits.|procedural
Declarative memory|60|Memory that can be consciously reported.|explicit memory~declarative
Implicit memory|60|Memory expressed without conscious recollection.|nondeclarative memory~implicit
Iconic memory|100|Very brief visual sensory memory, often introduced with Sperling's experiments.|iconic
Echoic memory|85|Brief auditory sensory memory.|echoic
Prospective memory|85|Remembering to carry out an intention in the future.|prospective
Spatial memory|60|Memory for locations and spatial relationships.|spatial
Autobiographical memory|60|Memory concerning one's own life.|autobiographical
Sensory memory|30|Brief persistence of sensory information.
`],
['plasticity','Name a mechanism or form of neural plasticity or learning.','Experience changes the brain','The weakening counterpart to LTP belongs in an intro course too.','Long-term depression','https://www.ncbi.nlm.nih.gov/books/NBK10886/',`
Long-term potentiation|10|A persistent increase in synaptic efficacy.|LTP~long term potentiation
Classical conditioning|30|Learning an association between stimuli.|Pavlovian conditioning
Operant conditioning|30|Learning shaped by consequences.|instrumental conditioning
Habituation|30|A reduced response after repeated stimulation.
Sensitization|60|An increased response following a strong or repeated stimulus.|sensitisation
Long-term depression|100|A persistent decrease in synaptic efficacy.|LTD~long term depression
Spike-timing-dependent plasticity|85|Synaptic change depending on relative pre- and postsynaptic spike timing.|STDP~spike timing dependent plasticity
Synaptic scaling|85|Homeostatic adjustment of synaptic strengths.
Hebbian plasticity|60|Activity-dependent change based on correlated neural activity.|Hebbian learning~Hebb's rule
Adult neurogenesis|85|Production of new neurons in adulthood, with species and region differences.|neurogenesis
Synaptic pruning|60|Selective elimination of synaptic connections.|pruning
Structural plasticity|60|Experience-related changes in neural structure.
Extinction|60|Reduced conditioned responding when reinforcement or pairing stops.
`],
['retina','Name a cell type found in the retina.','Vision','Think of the neuron that connects neighboring bipolar-cell pathways.','Amacrine cell','https://www.ncbi.nlm.nih.gov/books/NBK10885/',`
Rod|10|A photoreceptor specialized for dim-light vision.|rods~rod cell
Cone|30|A photoreceptor supporting daylight and color vision.|cones~cone cell
Retinal ganglion cell|60|Its axon contributes to the optic nerve.|ganglion cell~RGC
Bipolar cell|60|Relays signals between photoreceptors and ganglion cells.|retinal bipolar cell
Horizontal cell|85|Contributes to lateral interactions in the outer retina.|horizontal
Amacrine cell|100|An interneuron shaping signals in the inner retina.|amacrine
Müller cell|85|A radial glial cell supporting retinal tissue.|Muller cell~Müller glia~Muller glia
Retinal pigment epithelial cell|85|Supports photoreceptor function and recycles visual pigment components.|RPE cell~pigment epithelial cell
`],
['senses','Name a sensory modality.','Sensation and perception','There are more than five senses. Where are your limbs with your eyes closed?','Proprioception','https://www.ncbi.nlm.nih.gov/books/NBK11162/',`
Vision|10|Detection and processing of light.|sight~visual
Hearing|10|Detection and processing of sound.|audition~auditory
Touch|30|Mechanosensory processing at the body surface.|tactile sensation~tactition
Taste|30|Detection of dissolved tastants.|gustation
Smell|30|Detection of odorant molecules.|olfaction
Proprioception|100|The sense of body and limb position and movement.|position sense~kinesthesia~kinaesthesia
Vestibular sense|60|Signals head movement and orientation relative to gravity.|balance~equilibrioception~vestibular
Nociception|85|Detection and neural processing of potentially damaging stimuli.
Thermoception|85|Sensing temperature.|temperature~thermoreception
Interoception|85|Sensing the internal state of the body.
Pain|60|An unpleasant sensory and emotional experience, distinct from nociception.
`],
['sleep','Name a brain wave band or a recognized sleep stage.','Sleep and rhythms','The bursts around 12–15 Hz appear during which NREM stage?','N2 sleep','https://www.ncbi.nlm.nih.gov/books/NBK19956/',`
REM sleep|10|Sleep marked by rapid eye movements and characteristic muscle atonia.|REM~rapid eye movement
Alpha|30|An approximately 8–13 Hz rhythm prominent in relaxed, eyes-closed wakefulness.|alpha waves~alpha band
Beta|30|A faster band commonly associated with active wakefulness.|beta waves~beta band
Delta|60|Slow activity prominent in deep NREM sleep.|delta waves~delta band
Theta|60|A rhythm found in several states and circuits.|theta waves~theta band
Gamma|85|High-frequency activity associated with local processing and coordination.|gamma waves~gamma band
N1 sleep|60|The lightest conventional NREM sleep stage.|N1~stage 1~stage 1 sleep
N2 sleep|100|NREM sleep characterized by sleep spindles and K-complexes.|N2~stage 2~stage 2 sleep
N3 sleep|85|Slow-wave or deep NREM sleep.|N3~slow wave sleep~deep sleep~stage 3
`],
['lobes','Name a cerebral lobe or a primary cortical area.','The cerebral cortex','Think of where touch is first mapped in the cortex.','Primary somatosensory cortex','https://www.ncbi.nlm.nih.gov/books/NBK10998/',`
Frontal lobe|10|Includes motor and prefrontal areas.|frontal
Temporal lobe|30|Includes auditory and medial temporal memory-related regions.|temporal
Occipital lobe|30|Contains primary visual cortex.|occipital
Parietal lobe|30|Contributes to somatosensation and spatial processing.|parietal
Primary visual cortex|60|An early cortical stage of visual processing.|V1~striate cortex~visual cortex
Primary motor cortex|60|A major cortical source of descending motor signals.|M1~motor cortex
Primary auditory cortex|85|An early cortical stage of auditory processing.|A1~auditory cortex
Primary somatosensory cortex|100|The postcentral region containing major body maps.|S1~somatosensory cortex~postcentral gyrus
Insular lobe|85|A lobe buried within the lateral sulcus.|insula~insular cortex
Primary gustatory cortex|85|Includes anterior insular and frontal opercular regions.|gustatory cortex~taste cortex
Primary olfactory cortex|85|Includes piriform cortex.|piriform cortex~olfactory cortex
Limbic lobe|60|A classical anatomical grouping around the medial hemisphere.|limbic
`],
['channels','Name a neural ion channel or channel family.','Membranes and excitability','A channel opened by the inhibitory transmitter in your first synapse lecture is the gem.','GABA-A receptor','https://www.ncbi.nlm.nih.gov/books/NBK11103/',`
Sodium channel|10|Voltage-gated sodium channels drive the rising phase of many spikes.|voltage gated sodium channel~NaV~sodium
Potassium channel|30|Many potassium channels regulate excitability and repolarization.|voltage gated potassium channel~KV~potassium
Calcium channel|30|Calcium channels couple depolarization to intracellular signaling.|voltage gated calcium channel~CaV~calcium
Chloride channel|60|Anion channels can regulate neural excitability.|chloride
GABA-A receptor|100|An inhibitory transmitter-gated channel permeable mainly to chloride and bicarbonate.|GABAA~GABA A
NMDA receptor|60|An ionotropic glutamate receptor with a voltage-dependent magnesium block.|NMDA
AMPA receptor|60|A glutamate-gated channel important for fast excitation.|AMPA
HCN channel|85|A hyperpolarization-activated, cyclic-nucleotide-gated channel.|HCN
TRP channel|85|A diverse family including temperature-sensitive channels.|TRP~TRPV1
Leak potassium channel|60|Helps set resting membrane potential.|potassium leak channel~K2P
Nicotinic acetylcholine receptor|85|A ligand-gated cation channel.|nicotinic receptor~nAChR
Glycine receptor|85|An inhibitory ligand-gated anion channel.|GlyR
`],
['motor','Name a structure involved in motor control.','Movement','Remember the cerebellar cell with its beautiful dendritic tree.','Purkinje cell','https://www.ncbi.nlm.nih.gov/books/NBK11091/',`
Motor cortex|10|Contributes to planning and executing movements.|primary motor cortex~M1
Cerebellum|30|Supports movement coordination and learning.
Basal ganglia|30|A group of nuclei involved in action selection and other functions.
Spinal cord|30|Contains motor neurons and local movement circuits.
Substantia nigra|60|Dopaminergic neurons here modulate basal-ganglia circuits.
Premotor cortex|60|Contributes to preparation and selection of movements.|premotor
Supplementary motor area|85|Contributes to internally generated movement sequences.|SMA
Purkinje cell|100|The inhibitory output neuron of the cerebellar cortex.|Purkinje neuron~Purkinje
Red nucleus|85|A midbrain motor nucleus.|nucleus ruber
Subthalamic nucleus|85|An excitatory nucleus in basal-ganglia circuitry.|STN
Globus pallidus|60|A basal-ganglia nucleus with major motor output functions.
Putamen|60|A striatal region involved in motor circuits.
Lower motor neuron|60|Directly innervates skeletal muscle.|alpha motor neuron~motor neuron
Vestibular nucleus|85|Participates in balance, posture and eye-movement control.|vestibular nuclei
`],
['pathways','Name a neural tract or major white-matter pathway.','Neural connections','Touch and proprioception travel through a pathway you may have met in lab.','Dorsal column','https://www.ncbi.nlm.nih.gov/books/NBK10967/',`
Corpus callosum|10|Connects the cerebral hemispheres.
Optic tract|30|Carries retinal signals beyond the optic chiasm.
Corticospinal tract|30|A descending pathway supporting voluntary motor control.|corticospinal~pyramidal tract
Spinothalamic tract|60|Carries pain, temperature and some touch signals.|spinothalamic
Arcuate fasciculus|85|Connects regions within the language network.|arcuate
Fornix|60|A major output pathway of the hippocampal formation.
Dorsal column|100|Carries discriminative touch and proprioceptive information upward in the spinal cord.|dorsal columns~posterior column~DCML~dorsal column medial lemniscus
Medial lemniscus|85|A brainstem continuation of discriminative somatosensory pathways.
Optic radiation|85|Connects the lateral geniculate nucleus to visual cortex.|optic radiations
Internal capsule|60|Contains many ascending and descending fibers.
Anterior commissure|85|Connects temporal and olfactory-related regions across hemispheres.
Spinocerebellar tract|85|Conveys proprioceptive and other information to the cerebellum.|spinocerebellar
`],
['neurons','Name a neuron type.','Diversity of neurons','A tiny neuron from the cerebellum can be a big answer.','Granule cell','https://www.ncbi.nlm.nih.gov/books/NBK10805/',`
Motor neuron|10|A neuron that drives muscles or participates in motor output.|motoneuron
Sensory neuron|30|A neuron carrying sensory information.|afferent neuron
Interneuron|30|A neuron participating in local circuits.
Pyramidal cell|60|A common excitatory projection neuron in cortex.|pyramidal neuron
Purkinje cell|60|The inhibitory output neuron of the cerebellar cortex.|Purkinje neuron
Granule cell|100|A small neuron especially numerous in the cerebellum.|granule neuron~cerebellar granule cell
Basket cell|85|An inhibitory interneuron with basket-like axonal terminals.|basket neuron
Chandelier cell|85|An interneuron targeting axon initial segments.|axo axonic cell
Stellate cell|85|A neuron with a star-like dendritic arrangement.|stellate neuron
Medium spiny neuron|85|A principal inhibitory projection neuron of the striatum.|MSN~spiny projection neuron
Betz cell|85|A giant pyramidal neuron in primary motor cortex.|Betz neuron
Retinal ganglion cell|60|A retinal output neuron.|RGC
Bipolar neuron|60|A neuron with two primary processes.|bipolar cell
Pseudounipolar neuron|85|A sensory neuron morphology common in dorsal-root ganglia.|pseudounipolar
`],
['autonomic','Name a structure or transmitter involved in autonomic regulation.','The autonomic nervous system','The parasympathetic division travels far on a familiar cranial nerve.','Vagus nerve','https://www.ncbi.nlm.nih.gov/books/NBK539845/',`
Hypothalamus|10|A central coordinator of autonomic and endocrine regulation.
Acetylcholine|30|Released by all autonomic preganglionic neurons.|ACh
Norepinephrine|30|Released by most sympathetic postganglionic neurons.|noradrenaline~NE
Medulla|60|Contains circuits regulating cardiovascular and respiratory functions.|medulla oblongata
Sympathetic chain|60|A chain of paravertebral autonomic ganglia.|sympathetic trunk~paravertebral ganglia
Adrenal medulla|60|Releases catecholamines into circulation.
Vagus nerve|100|Carries major parasympathetic outflow to thoracic and abdominal organs.|vagus~CN X
Nucleus of the solitary tract|85|A brainstem hub for visceral sensory information.|NTS~solitary nucleus~nucleus tractus solitarius
Dorsal motor nucleus of the vagus|85|Supplies parasympathetic preganglionic neurons.|dorsal vagal nucleus
Nucleus ambiguus|85|Contains vagal neurons contributing to cardiac control.
Celiac ganglion|85|A prevertebral sympathetic ganglion.|coeliac ganglion
Enteric nervous system|60|Local neural circuits in the gastrointestinal tract.|enteric plexus~ENS
`],
['hormones','Name a hormone released by the hypothalamus, pituitary or pineal gland.','Neuroendocrinology','The hormone that tells the kidneys to retain water has another name.','Vasopressin','https://www.ncbi.nlm.nih.gov/books/NBK279070/',`
Melatonin|10|A pineal signal associated with biological night.
Oxytocin|30|Synthesized in the hypothalamus and released from posterior pituitary.
Growth hormone|30|An anterior-pituitary hormone regulating growth and metabolism.|GH~somatotropin
Prolactin|60|An anterior-pituitary hormone important for lactation.|PRL
Vasopressin|100|Hypothalamic hormone released by posterior pituitary; promotes water retention.|ADH~antidiuretic hormone~AVP
ACTH|60|Anterior-pituitary hormone that stimulates the adrenal cortex.|adrenocorticotropic hormone~corticotropin
TSH|60|Anterior-pituitary hormone stimulating the thyroid.|thyroid stimulating hormone~thyrotropin
FSH|60|Anterior-pituitary gonadotropin.|follicle stimulating hormone
LH|60|Anterior-pituitary gonadotropin.|luteinizing hormone~luteinising hormone
CRH|85|Hypothalamic releasing hormone stimulating ACTH secretion.|corticotropin releasing hormone
GnRH|85|Hypothalamic hormone stimulating gonadotropin release.|gonadotropin releasing hormone
TRH|85|Hypothalamic hormone promoting TSH secretion.|thyrotropin releasing hormone
Somatostatin|85|A hypothalamic hormone inhibiting growth-hormone release.
Dopamine|85|Hypothalamic dopamine inhibits pituitary prolactin release.
GHRH|85|Hypothalamic growth-hormone-releasing hormone.|growth hormone releasing hormone
`],
['protection','Name a structure that protects or cushions the central nervous system.','Protecting the brain','Remember the delicate innermost meningeal layer.','Pia mater','https://www.ncbi.nlm.nih.gov/books/NBK535357/',`
Skull|10|The bony cranium encloses the brain.|cranium
Cerebrospinal fluid|30|Fluid that provides buoyancy and mechanical cushioning.|CSF
Dura mater|30|The tough outer meningeal layer.|dura
Arachnoid mater|60|The middle meningeal layer.|arachnoid
Pia mater|100|The delicate meningeal layer closely following the CNS surface.|pia
Blood-brain barrier|60|A selective endothelial barrier regulating entry from blood.|BBB~blood brain barrier
Vertebral column|30|The spine protects the spinal cord.|spine~vertebrae
Meninges|30|The three protective membranes around brain and spinal cord.
Blood-CSF barrier|85|A selective barrier at the choroid plexus epithelium.|blood cerebrospinal fluid barrier
`],
['hearing','Name a structure in the auditory system.','Hearing','A tiny sensory cell transduces vibration into neural signals.','Inner hair cell','https://www.ncbi.nlm.nih.gov/books/NBK10946/',`
Cochlea|10|The spiral inner-ear structure containing the hearing apparatus.
Eardrum|30|Vibrates with sound pressure.|tympanic membrane
Auditory nerve|30|Carries cochlear signals to the brainstem.|cochlear nerve
Auditory cortex|30|Cortical processing regions for hearing.|A1~primary auditory cortex
Basilar membrane|60|Its mechanical properties contribute to frequency tuning.
Organ of Corti|60|The cochlear sensory epithelium.|Corti
Inner hair cell|100|The main sensory receptor cell sending auditory signals to afferent fibers.|inner hair cells~IHC
Outer hair cell|85|Amplifies and sharpens cochlear mechanical responses.|outer hair cells~OHC
Inferior colliculus|85|A major midbrain auditory processing station.
Medial geniculate nucleus|85|A thalamic auditory relay.|MGN~medial geniculate body
Superior olive|85|A brainstem complex involved in binaural processing.|superior olivary complex
Cochlear nucleus|60|The first central relay for cochlear nerve fibers.|cochlear nuclei
Stapes|60|The ossicle transmitting vibration to the oval window.|stirrup
Malleus|60|An ossicle attached to the tympanic membrane.|hammer
Incus|60|The middle ossicle.|anvil
`],
['vision','Name a structure in the visual pathway.','From photons to perception','Remember the X-shaped crossing beneath the brain.','Optic chiasm','https://www.ncbi.nlm.nih.gov/books/NBK10944/',`
Retina|10|Neural tissue at the back of the eye.
Optic nerve|30|Carries retinal ganglion-cell axons out of the eye.
Visual cortex|30|Cortical regions processing visual information.|V1~primary visual cortex~striate cortex
Optic tract|60|Carries visual signals after the chiasm.
Optic chiasm|100|The crossing where nasal retinal axons switch sides.|optic chiasma~chiasm
Lateral geniculate nucleus|60|A thalamic relay to primary visual cortex.|LGN~lateral geniculate body
Optic radiation|85|Axons from the LGN to visual cortex.|optic radiations
Superior colliculus|85|Contributes to visual orienting and eye movements.
Pretectum|85|A midbrain region involved in pupillary light responses.|pretectal nucleus
Suprachiasmatic nucleus|85|Receives retinal light information for circadian timing.|SCN
Retinal ganglion cell|60|A retinal output cell.|ganglion cell~RGC
Photoreceptor|30|A light-transducing cell.|rod~cone~rods~cones
`],
['potential','Name an event or property of an action potential.','The neural impulse','The interval where a neuron cannot fire again is a textbook gem.','Absolute refractory period','https://www.ncbi.nlm.nih.gov/books/NBK11054/',`
Depolarization|10|Membrane potential becomes less negative.|depolarisation
Repolarization|30|The membrane returns toward its resting potential.|repolarisation
Hyperpolarization|30|Membrane potential becomes more negative.|hyperpolarisation~afterhyperpolarization
Threshold|30|The voltage range at which regenerative firing can begin.|firing threshold
All-or-none|60|Individual spikes are regenerative rather than graded in amplitude.|all or none~all or nothing
Absolute refractory period|100|A period when another action potential cannot be initiated.|absolute refractory~absolute refractoriness
Relative refractory period|85|A period when stronger-than-usual input may evoke a spike.|relative refractory
Saltatory conduction|60|Regeneration of spikes at nodes along a myelinated axon.|saltatory
Sodium channel inactivation|85|A major contributor to spike termination and absolute refractoriness.|Na channel inactivation~inactivation
Potassium efflux|60|Outward potassium movement helps repolarize many neurons.|potassium outflow
Sodium influx|30|Inward sodium movement drives many spike upstrokes.|sodium inflow
Overshoot|85|The phase when the inside of the membrane becomes positive.
`],
['learningtypes','Name a recognized form of learning.','How experience teaches','One exposure can teach a powerful lesson about food.','Taste aversion learning','https://www.ncbi.nlm.nih.gov/books/NBK10960/',`
Classical conditioning|10|Learning a predictive association between stimuli.|Pavlovian conditioning
Operant conditioning|30|Learning from the consequences of behavior.|instrumental learning~instrumental conditioning
Habituation|30|Learning to respond less to repeated innocuous stimulation.
Sensitization|60|An increased response following stimulation.|sensitisation
Observational learning|60|Learning by observing others.|social learning
Taste aversion learning|100|Learning to avoid a flavor associated with illness, sometimes after one pairing.|conditioned taste aversion~taste aversion~Garcia effect
Imprinting|85|Rapid early learning during a sensitive developmental period.
Perceptual learning|85|Experience-related improvement in sensory discrimination.
Motor learning|60|Experience-dependent improvement in movement.
Latent learning|85|Learning expressed later when circumstances make it useful.
Associative learning|30|Learning relationships between events.
Nonassociative learning|60|Learning from repeated exposure without pairing events.|non associative learning
Reversal learning|85|Learning that a previously learned contingency has changed.
Fear conditioning|60|Associative learning involving an aversive outcome.
`],
['development','Name a process in nervous-system development.','Building a nervous system','The programmed removal of cells is the gem.','Apoptosis','https://www.ncbi.nlm.nih.gov/books/NBK11044/',`
Neurogenesis|10|The production of neurons.
Myelination|30|Formation of myelin around axons.
Synaptogenesis|30|Formation of synapses.
Neuronal migration|60|Movement of developing neurons toward their destinations.|migration
Axon guidance|60|Directional growth of axons toward targets.
Synaptic pruning|60|Selective elimination of synaptic connections.|pruning
Apoptosis|100|Programmed cell death that helps shape developing neural populations.|programmed cell death
Neurulation|85|Formation of the neural tube.
Differentiation|60|Acquisition of specialized cell identities.|cell differentiation~neuronal differentiation
Induction|85|Signals directing developmental fates.|neural induction
Proliferation|60|Cell division expanding precursor populations.|cell proliferation
Gliogenesis|85|Production of glial cells.
Growth cone navigation|85|Guided extension of the motile tip of a growing axon.|growth cone guidance
`],
['reflex','Name a reflex studied in neuroscience.','Reflex circuits','The opposite leg helps you stay standing when you withdraw from something painful.','Crossed-extensor reflex','https://www.ncbi.nlm.nih.gov/books/NBK10809/',`
Patellar reflex|10|A quadriceps stretch reflex.|knee jerk~knee jerk reflex~patellar
Pupillary light reflex|30|Pupil constriction in response to light.|pupillary reflex~light reflex
Withdrawal reflex|30|Pulls a limb away from a potentially harmful stimulus.|flexor reflex~flexion reflex
Stretch reflex|60|Muscle stretch evokes contraction through a spinal circuit.|myotatic reflex
Crossed-extensor reflex|100|Contralateral extension supports the body during withdrawal.|crossed extensor reflex~crossed extension
Vestibulo-ocular reflex|60|Stabilizes gaze during head movement.|VOR~vestibulo ocular reflex
Achilles reflex|60|An ankle plantar-flexion stretch reflex.|ankle jerk~ankle reflex
Corneal reflex|85|Blinking in response to corneal stimulation.|blink reflex
Gag reflex|60|A pharyngeal reflex response.|pharyngeal reflex
Babinski response|85|An extensor plantar response; normal in infants.|Babinski reflex~Babinski~plantar reflex
Golgi tendon reflex|85|A spinal reflex involving tendon-organ afferents.|inverse myotatic reflex
Accommodation reflex|85|Eye adjustments for viewing near objects.|near response
`],
['cerebellum','Name a structure or cell type in the cerebellum.','The little brain','The middle layer is named after its extraordinary output neuron.','Purkinje cell layer','https://www.ncbi.nlm.nih.gov/books/NBK11132/',`
Purkinje cell|10|The inhibitory output neuron of cerebellar cortex.|Purkinje neuron
Granule cell|30|An abundant excitatory neuron of cerebellar cortex.|granule neuron
Vermis|60|The midline region of the cerebellum.
Dentate nucleus|60|A deep cerebellar output nucleus.|dentate
Purkinje cell layer|100|The thin cortical layer containing Purkinje somata.|Purkinje layer
Molecular layer|60|The outer layer of cerebellar cortex.
Granular layer|60|The inner cortical layer rich in granule cells.|granule cell layer
Flocculus|85|A cerebellar region involved in eye-movement control.
Nodulus|85|Part of the vestibulocerebellum.
Fastigial nucleus|85|A deep medial cerebellar nucleus.|fastigial
Basket cell|85|An inhibitory interneuron in the molecular layer.
Golgi cell|85|An inhibitory interneuron regulating granule cells.|Golgi neuron
Mossy fiber|60|An excitatory afferent forming synapses with granule cells.|mossy fibre
Climbing fiber|85|An excitatory input from inferior olive to Purkinje cells.|climbing fibre
`],
['somatic','Name a somatosensory receptor type.','Touch, position and pain','Think of the receptor in a tendon, rather than in a muscle.','Golgi tendon organ','https://www.ncbi.nlm.nih.gov/books/NBK10895/',`
Pain receptor|10|A sensory ending detecting potentially damaging stimuli.|nociceptor
Thermoreceptor|30|A temperature-sensitive receptor.|temperature receptor
Muscle spindle|60|Detects muscle stretch and contributes to proprioception.|spindle
Pacinian corpuscle|60|A rapidly adapting receptor sensitive to vibration.|Pacinian~lamellar corpuscle
Meissner corpuscle|60|A rapidly adapting touch receptor in glabrous skin.|Meissner~Meissner's corpuscle
Merkel ending|85|A slowly adapting receptor supporting fine touch.|Merkel disc~Merkel disk~Merkel cell
Ruffini ending|85|A slowly adapting receptor sensitive to skin stretch.|Ruffini corpuscle~Ruffini
Golgi tendon organ|100|A proprioceptive receptor sensitive to muscle tension.|GTO~tendon organ
Free nerve ending|60|An unencapsulated sensory ending.|free nerve endings
Hair follicle receptor|85|A mechanoreceptor responding to hair movement.|hair receptor~hair follicle ending
`],
['limbic','Name a structure associated with the limbic system.','Emotion and memory','An arching white-matter tract carries hippocampal output.','Fornix','https://www.ncbi.nlm.nih.gov/books/NBK538491/',`
Amygdala|10|Involved in salience and emotional learning.
Hippocampus|30|Important for episodic and spatial memory.
Hypothalamus|30|Connects behavioral states with homeostatic and endocrine regulation.
Cingulate cortex|60|A medial cortical region involved in affect and cognition.|cingulate gyrus~cingulate
Fornix|100|A major white-matter output pathway of the hippocampal formation.
Mammillary bodies|85|Hypothalamic structures participating in memory circuitry.|mammillary body
Septal nuclei|85|Forebrain nuclei connected with hippocampal and other limbic regions.|septum~septal nucleus
Parahippocampal gyrus|60|A medial temporal region associated with memory.
Entorhinal cortex|85|A major interface between hippocampus and neocortex.|entorhinal
Anterior thalamic nuclei|85|Thalamic components of the Papez memory circuit.|anterior thalamic nucleus
Nucleus accumbens|60|A ventral striatal region involved in motivation.|accumbens
`],
['synapse','Name a component or process of chemical synaptic transmission.','Across the synapse','How is transmitter cleared back into a cell?','Reuptake','https://www.ncbi.nlm.nih.gov/books/NBK11001/',`
Neurotransmitter|10|A chemical messenger released by a presynaptic neuron.
Synaptic vesicle|30|A membrane-bound packet storing transmitter.|vesicle
Synaptic cleft|30|The extracellular gap across a synapse.|cleft
Receptor|30|A protein that responds to transmitter binding.|postsynaptic receptor
Exocytosis|60|Fusion of vesicles with the presynaptic membrane.
Calcium influx|60|Entry of calcium can trigger vesicle fusion.|calcium entry
Reuptake|100|Transport of transmitter back into neurons or glia by transporter proteins.|uptake~transmitter reuptake
SNARE complex|85|A protein assembly driving membrane fusion.|SNARE~SNARE proteins
Synaptotagmin|85|A calcium sensor for fast vesicle release.
Enzymatic degradation|60|Breakdown of transmitter by enzymes.|degradation
Endocytosis|85|Retrieval of vesicle membrane from the cell surface.
Postsynaptic potential|60|A change in membrane voltage following synaptic input.|PSP~EPSP~IPSP
Active zone|85|The presynaptic site specialized for transmitter release.
Quantal release|85|Transmitter release in vesicle-sized packets.|quantal transmission
`],
['language','Name a brain region or pathway associated with language.','Language in the brain','A connection between language regions is more niche than either endpoint.','Arcuate fasciculus','https://www.ncbi.nlm.nih.gov/books/NBK10936/',`
Broca area|10|A left inferior frontal region involved in language production and processing.|Broca's area~Broca
Wernicke area|30|A classical posterior temporal language region.|Wernicke's area~Wernicke
Auditory cortex|30|Processes speech sounds alongside other sounds.|primary auditory cortex~A1
Motor cortex|30|Controls articulatory movements.|primary motor cortex~M1
Angular gyrus|60|Contributes to semantic processing and other functions.|angular
Supramarginal gyrus|85|Contributes to phonological processing and other functions.|supramarginal
Arcuate fasciculus|100|A white-matter tract linking frontal and temporal language networks.|arcuate
Superior temporal gyrus|60|Contains regions involved in auditory and speech processing.|STG
Inferior frontal gyrus|60|Includes classical Broca regions.|IFG
Middle temporal gyrus|85|Participates in lexical and semantic processing.|MTG
Insula|85|Contributes to speech motor planning among other functions.|insular cortex
`],
['diseases','Name a neurological disorder.','Clinical neuroscience','The disorder involving loss of CNS myelin is taught early on.','Multiple sclerosis','https://www.ninds.nih.gov/health-information/disorders',`
Alzheimer disease|10|A neurodegenerative disorder commonly affecting memory early.|Alzheimer's disease~Alzheimers~Alzheimer
Parkinson disease|30|A movement disorder associated with loss of nigrostriatal dopamine neurons.|Parkinson's disease~Parkinsons~Parkinson
Epilepsy|30|A disorder involving an enduring predisposition to epileptic seizures.
Stroke|30|Brain injury from interrupted blood flow or hemorrhage.|cerebrovascular accident~CVA
Migraine|30|A neurological disorder with recurrent attacks and often headache.
Huntington disease|60|An inherited neurodegenerative disorder linked to an HTT repeat expansion.|Huntington's disease~Huntingtons~Huntington
Amyotrophic lateral sclerosis|60|A motor neuron disease.|ALS~Lou Gehrig disease~Lou Gehrig's disease
Multiple sclerosis|100|An immune-mediated disorder involving CNS demyelination.|MS
Myasthenia gravis|85|An autoimmune disorder affecting neuromuscular transmission.|myasthenia
Guillain-Barré syndrome|85|An acute immune-mediated peripheral neuropathy.|Guillain Barre~GBS
Narcolepsy|60|A sleep-wake disorder; type 1 is associated with orexin-neuron loss.
Tourette syndrome|60|A neurodevelopmental tic disorder.|Tourette's syndrome~Tourettes
Essential tremor|85|A movement disorder characterized by action tremor.
Trigeminal neuralgia|85|A disorder causing brief attacks of severe facial pain.
`]
];

export const TIERS = [
  {points:10,name:'Plankton',color:'#9aaebe'},
  {points:15,name:'Too clever',color:'#a9bbbc'},
  {points:30,name:'Schooler',color:'#7cc9e4'},
  {points:60,name:'Rare',color:'#bd9df3'},
  {points:85,name:'Deep cut',color:'#fa9fb9'},
  {points:100,name:'Neurokrillion',color:'#f3d883'}
];
const originalBank = sets.map(([id,prompt,topic,hint,anchor,source,rows]) => ({
  id,prompt,topic,hint,anchor,source:source.includes("ncbi.nlm.nih.gov/books/") ? "https://www.ncbi.nlm.nih.gov/books/NBK10799/toc/" : source,
  answers: rows.trim().split('\n').map(row => {
    const [name,points,explanation,aliases=''] = row.trim().split('|');
    return {name,points:Number(points),explanation,aliases:aliases.split('~').filter(Boolean)};
  })
}));
export const STUDY_BANK = [...originalBank,...EXPANSION,...ADDITIONS];
export const PLAY_BANK = buildPlayBank(STUDY_BANK);
export const BANK = [...PLAY_BANK,...STUDY_BANK];
export const LIBRARY_STATS = {playCategories:PLAY_BANK.length,minAnswers:Math.min(...PLAY_BANK.map(q=>q.answers.length)),maxAnswers:Math.max(...PLAY_BANK.map(q=>q.answers.length)),uniqueAnswers:new Set(BANK.flatMap(q=>q.answers.map(a=>a.name.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'')))).size};
export const tierFor = points => TIERS.find(t => t.points === points) || TIERS[0];
